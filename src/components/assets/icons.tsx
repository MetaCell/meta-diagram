import * as React from "react";
import { SVGProps } from "react";

export const MoveToolIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={14}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m4.07 14.5-2.683-13 11.226 6.786-5.401 1.466L4.07 14.5Z"
      stroke="#1A1A1A"
      strokeLinecap="square"
    />
  </svg>
);

export const HandIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="a"
      maskUnits="userSpaceOnUse"
      x={0.302}
      y={0}
      width={18}
      height={20}
      fill="#000"
    >
      <path fill="#fff" d="M.302 0h18v20h-18z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.698 1a1 1 0 0 0-1 1v7h-1V4a1 1 0 1 0-2 0v8.045L3.35 10.31a1.267 1.267 0 0 0-1.74.216c-.452.548-.4 1.369.118 1.856l5.005 4.706c.035.032.07.063.106.092A4.99 4.99 0 0 0 10.698 19h1a5 5 0 0 0 5-5V6a1 1 0 1 0-2 0v3h-1V3a1 1 0 1 0-2 0v6h-1V2a1 1 0 0 0-1-1Z"
      />
    </mask>
    <path
      d="M8.698 9v1h1V9h-1Zm-1 0h-1v1h1V9Zm-2 3.045-.595.804 1.595 1.178v-1.982h-1ZM3.35 10.31l-.594.805.594-.805Zm-1.74.216.771.637-.77-.637Zm.118 1.856.685-.729-.685.729Zm5.005 4.706.685-.729-.685.729Zm.106.092.772-.636-.065-.079-.08-.064-.627.78ZM16.698 14h1-1Zm0-3.05h-1 1Zm0-1.95h1-1Zm0-3h-1 1Zm-2 3v1h1V9h-1Zm-1 0h-1v1h1V9Zm-2 0v1h1V9h-1Zm-1 0h-1v1h1V9Zm-1-7V0a2 2 0 0 0-2 2h2Zm0 7V2h-2v7h2Zm-2 1h1V8h-1v2Zm-1-6v5h2V4h-2Zm0 0h2a2 2 0 0 0-2-2v2Zm0 0V2a2 2 0 0 0-2 2h2Zm0 5V4h-2v5h2Zm0 3.045V9h-2v3.045h2Zm-3.942-.93 2.347 1.734 1.189-1.608-2.347-1.735-1.189 1.609Zm-.375.048a.267.267 0 0 1 .375-.048l1.189-1.609a2.267 2.267 0 0 0-3.106.383l1.542 1.274Zm.032.49a.368.368 0 0 1-.032-.49L.84 9.889a2.368 2.368 0 0 0 .204 3.221l1.37-1.457Zm5.005 4.706-5.005-4.706-1.37 1.457 5.005 4.706 1.37-1.457Zm.048.042a.807.807 0 0 1-.048-.042l-1.37 1.457c.053.05.108.099.165.144l1.253-1.559ZM10.698 18a3.99 3.99 0 0 1-3.087-1.456l-1.543 1.273A5.99 5.99 0 0 0 10.698 20v-2Zm1 0h-1v2h1v-2Zm4-4a4 4 0 0 1-4 4v2a6 6 0 0 0 6-6h-2Zm0-3.05V14h2v-3.05h-2Zm0-1.95v1.95h2V9h-2Zm0-3v3h2V6h-2Zm0 0h2a2 2 0 0 0-2-2v2Zm0 0V4a2 2 0 0 0-2 2h2Zm0 3V6h-2v3h2Zm-2 1h1V8h-1v2Zm-1-7v6h2V3h-2Zm0 0h2a2 2 0 0 0-2-2v2Zm0 0V1a2 2 0 0 0-2 2h2Zm0 6V3h-2v6h2Zm-2 1h1V8h-1v2Zm-1-8v7h2V2h-2Zm0 0h2a2 2 0 0 0-2-2v2Z"
      fill="#1A1A1A"
      mask="url(#a)"
    />
  </svg>
);

export const ShapeArrowToolIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.5.8a.5.5 0 0 0-.5-.5h-4.5a.5.5 0 0 0 0 1h4v4a.5.5 0 0 0 1 0V.8ZM1.354 17.154l16-16-.708-.708-16 16 .708.708Z"
      fill="#000"
      fillOpacity={0.8}
    />
  </svg>
);

export const FileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={22}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.698 1.785h9.59V4.65h-9.59V1.785Zm-1 2.864V.785h11.59V4.65h9.014v14.165H.698V4.65Zm1 1v12.165h18.604V5.65H1.698Z"
      fill="#000"
      fillOpacity={0.8}
    />
  </svg>
);
