
import React from "react";

const ContactMap = () => {
  return (
    <div className="glass-card p-4 overflow-hidden">
      <div className="aspect-video h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.5907938023704!2d-57.53762968499812!3d-25.283904783861392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da8ab969cea4f%3A0x6cd8e835c57bfc6!2sFacultad%20de%20Ingenier%C3%ADa%20UNA!5e0!3m2!1ses!2spy!4v1633377980226!5m2!1ses!2spy"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de ubicación de la FIUNA"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactMap;
