import json, re, sys

with open("reports/lighthouse-report.html", "r") as f:
    html = f.read()

lhr = None
# Try multiple patterns
for marker in ['window.__LIGHTHOUSE_JSON__ = ', '{"lighthouseVersion"', '{"configSettings"']:
    idx = html.find(marker)
    if idx != -1:
        if marker.startswith('window'):
            idx += len(marker)
        data = html[idx:]
        end = data.find('\n</script>')
        if end == -1:
            end = data.find('</script>')
        data = data[:end] if end != -1 else data
        # Strip trailing semicolons
        data = data.rstrip().rstrip(';')
        try:
            lhr = json.loads(data)
            break
        except Exception as e:
            continue

if lhr is None:
    # Try finding JSON blob via decoder
    import json.decoder
    for marker in ['{"lighthouseVersion"']:
        idx = html.find(marker)
        if idx != -1:
            try:
                decoder = json.JSONDecoder()
                lhr, _ = decoder.raw_decode(html, idx)
                break
            except Exception as e:
                print(f"Decoder error: {e}")

if lhr:
    categories = lhr.get("categories", {})
    print("=== SCORES ===")
    for k, v in categories.items():
        print(f"  {k}: {round(v['score']*100)}")

    print("\n=== KEY METRICS ===")
    audits = lhr.get("audits", {})
    key_metrics = [
        "first-contentful-paint", "largest-contentful-paint", "total-blocking-time",
        "cumulative-layout-shift", "speed-index", "interactive", "bootup-time",
        "unused-javascript", "render-blocking-resources", "uses-responsive-images",
    ]
    for m in key_metrics:
        if m in audits:
            a = audits[m]
            score = a.get("score")
            score_str = f"{round(score*100)}" if score is not None else "N/A"
            display = a.get("displayValue", "")
            print(f"  [{score_str:>3s}] {m}: {display}")

    print("\n=== OPPORTUNITIES (savings) ===")
    for k, a in audits.items():
        if a.get("details", {}).get("type") == "opportunity":
            savings = a.get("details", {}).get("overallSavingsMs", 0) or 0
            savings_bytes = a.get("details", {}).get("overallSavingsBytes", 0) or 0
            if savings > 100 or savings_bytes > 10000:
                score = a.get("score", 1) or 1
                print(f"  {k}: {savings:.0f}ms / {savings_bytes//1024}KB  (score: {score:.2f})")
else:
    print("Could not parse report")
