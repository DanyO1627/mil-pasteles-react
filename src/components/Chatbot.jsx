import { useEffect, useRef, useState } from "react";
import "../styles/home.css";
import chatIcon from "../assets/chatbot.png";

function autoReply(t) {
  const s = t.toLowerCase();
  if (s.includes("horario")) return "Atendemos de 9:00 a 19:00, lunes a sábado.";
  if (s.includes("dirección") || s.includes("direccion")) return "Av. Providencia 1900, Santiago.";
  if (s.includes("teléfono") || s.includes("telefono")) return "WhatsApp: +56 9 1234 5678.";
  if (s.includes("torta") || s.includes("pedido")) return "Hacemos tortas personalizadas 🎂 ¿para cuántas personas y qué fecha?";
  return "Gracias por escribir. En breve te responde alguien del equipo 😊";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{role:"bot", text:"Hola 👋 ¿En qué te ayudo hoy?"}]);
  const [txt, setTxt]   = useState("");
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, open]);

  function send(e) {
    e.preventDefault();
    const t = txt.trim();
    if (!t) return;
    setMsgs(m => [...m, {role:"user", text:t}]);
    setTxt("");
    setTimeout(() => setMsgs(m => [...m, {role:"bot", text:autoReply(t)}]), 500);
  }

  return (
    <>
      <button id="chat-btn" aria-label="Abrir chat" aria-expanded={open} onClick={()=> setOpen(v=>!v)}>
        <img src={chatIcon} alt="Abrir chat Pastelería" />
      </button>

      {open && (
        <div id="chat-box" role="dialog" aria-label="Chat Pastelería" aria-modal="false" style={{display:"flex", flexDirection:"column"}}>
          <div className="chat-header">
            <strong>Chat Pastelería 🍰</strong>
            <button id="chat-close" aria-label="Cerrar" onClick={()=> setOpen(false)}>✕</button>
          </div>
          <div id="chat-body" className="chat-body" ref={bodyRef}>
            {msgs.map((m,i)=>(
              <div key={i} className={m.role==="user"?"user-msg":"bot-msg"}>{m.text}</div>
            ))}
          </div>
          <form id="chat-form" className="chat-footer" onSubmit={send} autoComplete="off">
            <input id="chat-input" value={txt} onChange={e=>setTxt(e.target.value)} placeholder="Escribe tu mensaje…"/>
            <button type="submit" id="chat-send">Enviar</button>
          </form>
        </div>
      )}
    </>
  );
}
