import React from "react";

interface LogoProps {
  color?: string;
}

function Logo({ color = "#25092c" }: LogoProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="27.724"
      version="1.1"
      viewBox="0 0 37.432 18.483"
    >
      <g display="inline" transform="translate(-636.195 -125.956)">
        <g
          scale="100"
          stroke={color}
          strokeDasharray="none"
          strokeOpacity="1"
          strokeWidth="0.7"
          paintOrder="markers fill stroke"
          transform="translate(624.96 -47.975) scale(.94897)"
        >
          <path
            fill="none"
            d="M31.657 194.03c-.7 5.648-4.12 7.724-9.154 8.057-5.035.333-8.7-1.153-9.076-6.852-.377-5.699-2.893-7.592 2.152-7.71 6.463-.154 16.604 2.267 16.078 6.505z"
          ></path>
          <path
            fill="none"
            d="M33.86 194.76l1.849 5.75s5.967-4.197 2.872-5.63"
          ></path>
          <path
            fill="none"
            d="M46.43 198.547c-.173 1.434-1.023 1.96-2.275 2.043-1.253.082-2.165-.296-2.26-1.743-.096-1.447-.723-1.928.532-1.957 1.608-.036 4.132.582 4.003 1.657z"
          ></path>
          <path d="M50.557 199.733c.023.357.101.57-.11.197-.24-.425-.967-.226-.99-.583-.024-.357.381-.675.905-.71.524-.034.171.739.195 1.096z"></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M46.159 199.497c2.93-5.692-.693-16.004-.693-16.004"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M12.608 190.302l2.97-2.778"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M13.039 192.342l4.624-4.785"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M13.427 195.235c5.953-7.544 8.041-7.265 8.041-7.265"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M13.746 197.287l9.788-8.914"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M14.956 199.783l11.062-10.726"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M16.697 201.205l11.165-11.442"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M19.312 202.005l10.875-10.875"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M22.503 202.087l9.073-9.073"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M26.74 201.199c3.512-6.085 4.495-5.097 4.495-5.097"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M41.894 198.847l2.434-1.757"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M44.155 200.59l2.275-2.043"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M42.485 200.214l3.022-2.74"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M41.988 199.417l2.871-2.187"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M43.302 200.558l2.705-2.791"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M12.734 190.906l3.43-3.389"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M12.848 191.427l3.894-3.904"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M13.166 193.04l5.027-5.45"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M13.277 193.762l5.598-6.12"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M13.505 196.04l8.383-7.999"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M14.159 198.469l10.37-9.852"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M15.759 200.588l11.099-11.236"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M17.671 201.622c8.636-8.628 11.323-11.291 11.323-11.291"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M21.322 202.131l9.711-9.71"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M20.368 202.108l10.419-10.42"
          ></path>
          <path
            fill="none"
            fillOpacity="1"
            d="M23.846 201.95l7.795-7.795"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export default Logo;
