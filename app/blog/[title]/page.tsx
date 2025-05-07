import React from "react";

const Page = () => {
  return (
    <main
      style={{
        fontFamily: "Segoe UI, Arial, sans-serif",
        background: "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)",
        minHeight: "100vh",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          background: "rgba(255,255,255,0.13)",
          borderRadius: 18,
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
          padding: "48px 32px",
          marginTop: 48,
        }}
      >
        <h1 style={{ color: "#ff5e62", fontSize: 40, marginBottom: 8 }}>
          How to Build a Simple HTTP File Server in Rust
        </h1>
        <p style={{ color: "#333", fontSize: 20, marginBottom: 32 }}>
          In this tutorial, you&apos;ll learn how to create a colourful,
          directory-browsing HTTP file server in Rust from scratch. We&apos;ll
          break down the main parts and show you how to serve files and folders
          with style!
        </p>

        <h2 style={{ color: "#ff9966", marginTop: 32 }}>1. Project Setup</h2>
        <ul>
          <li>
            Install Rust:{" "}
            <code>
              curl --proto &apos;=https&apos; --tlsv1.2 -sSf
              https://sh.rustup.rs | sh
            </code>
          </li>
          <li>
            Create a new project: <code>cargo new simple-http</code>
          </li>
          <li>
            Add dependencies in <code>Cargo.toml</code>:
            <pre
              style={{
                background: "#222",
                color: "#ffe066",
                padding: 12,
                borderRadius: 8,
              }}
            >
              {`[dependencies]
infer = "0.3"
url-escape = "0.1.1"`}
            </pre>
          </li>
        </ul>

        <h2 style={{ color: "#ff9966", marginTop: 32 }}>
          2. Main Server Logic (<code>src/main.rs</code>)
        </h2>
        <p>
          The main file sets up a TCP listener on <b>localhost:5500</b> and
          spawns a thread for each incoming connection. Each client is handled
          by reading the request, parsing it, and sending back a response.
        </p>
        <pre
          style={{
            background: "#222",
            color: "#ffe066",
            padding: 12,
            borderRadius: 8,
            fontSize: 15,
          }}
        >
          {`let listener = TcpListener::bind(socket)?;
for stream in listener.incoming() {
    std::thread::spawn(|| handle_client(&mut stream?));
}`}
        </pre>

        <h2 style={{ color: "#ff9966", marginTop: 32 }}>
          3. HTTP Request & Response Handling
        </h2>
        <p>
          <b>Request parsing</b> is handled in <code>src/http/request.rs</code>.
          It extracts the HTTP method, path, and headers. <br />
          <b>Response generation</b> is in <code>src/http/response.rs</code>. It
          checks if the path is a file or directory:
        </p>
        <ul>
          <li>
            <b>Files:</b> Reads and serves the file (as text or binary).
          </li>
          <li>
            <b>Directories:</b> Generates a styled HTML page listing files and
            folders, with links for navigation.
          </li>
        </ul>
        <pre
          style={{
            background: "#222",
            color: "#ffe066",
            padding: 12,
            borderRadius: 8,
            fontSize: 15,
          }}
        >
          {`if new_path.is_file() {
    // Serve file
} else if new_path.is_dir() {
    // Generate directory listing HTML
}`}
        </pre>

        <h2 style={{ color: "#ff9966", marginTop: 32 }}>
          4. Directory Listing UI
        </h2>
        <p>
          The server returns a colourful HTML page for directories, using inline
          CSS for a modern look. Each file/folder is a link, and you can
          navigate up and down the directory tree.
        </p>
        <pre
          style={{
            background: "#222",
            color: "#ffe066",
            padding: 12,
            borderRadius: 8,
            fontSize: 15,
          }}
        >
          {`<li><a class='dir' href='/subdir/'>subdir/</a></li>
<li><a class='file' href='/file.txt'>file.txt</a></li>`}
        </pre>

        <h2 style={{ color: "#ff9966", marginTop: 32 }}>
          5. Running the Server
        </h2>
        <ul>
          <li>
            Build and run: <code>cargo run</code>
          </li>
          <li>
            Open{" "}
            <a
              href="http://localhost:5500/"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:5500/
            </a>{" "}
            in your browser.
          </li>
          <li>Browse, download, and enjoy your files!</li>
        </ul>

        <h2 style={{ color: "#ff9966", marginTop: 32 }}>6. Security Notes</h2>
        <ul>
          <li>
            Server only listens on <b>localhost</b> for safety.
          </li>
          <li>
            Prevents directory backtracking (no <code>..</code> in paths).
          </li>
          <li>
            Not for production use—great for local file sharing and learning.
          </li>
        </ul>

        <h2 style={{ color: "#ff9966", marginTop: 32 }}>7. Customization</h2>
        <ul>
          <li>
            Edit <code>index.html</code> for your own landing page.
          </li>
          <li>
            Change the CSS in <code>response.rs</code> for a different look.
          </li>
        </ul>

        <h2 style={{ color: "#ff9966", marginTop: 32 }}>Summary</h2>
        <p>
          You now have a simple, beautiful HTTP file server in Rust! Explore the
          code, tweak the styles, and use it as a base for your own projects.
        </p>
        <footer
          style={{
            marginTop: 40,
            color: "#fff",
            fontSize: 16,
            opacity: 0.8,
            textAlign: "center",
          }}
        >
          &copy; {new Date().getFullYear()} Ovdizzle Rust Server Tutorial
        </footer>
      </div>
    </main>
  );
};

export default Page;
