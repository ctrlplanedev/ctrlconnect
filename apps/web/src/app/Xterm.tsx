"use client";

import "@xterm/xterm/css/xterm.css";

import { useEffect, useRef } from "react";

import { ClipboardAddon } from "@xterm/addon-clipboard";
import { FitAddon } from "@xterm/addon-fit";
import { SearchAddon } from "@xterm/addon-search";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { Terminal } from "@xterm/xterm";

import { AttachAddon } from "@ctrlshell/xterm-addon";

export type XTermProps = {
  ws: WebSocket;
  instanceId: string;
  clientId: string;
};

export const Xterm: React.FC<XTermProps> = ({ ws }) => {
  const ref = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<Terminal | null>(null);
  useEffect(() => {
    if (ref.current == null || terminalRef.current != null) return;
    const terminal = new Terminal();
    terminal.open(ref.current);
    terminal.loadAddon(new FitAddon());
    terminal.loadAddon(new SearchAddon());
    terminal.loadAddon(new ClipboardAddon());
    terminal.loadAddon(new WebLinksAddon());
    terminal.loadAddon(new AttachAddon({ ws, instanceId, clientId }));
    terminalRef.current = terminal;
  }, [ref, ws, terminalRef]);
  return <div ref={ref} />;
};
