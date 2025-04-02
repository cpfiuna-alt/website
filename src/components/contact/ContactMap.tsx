
import React from "react";

const ContactMap = () => {
  return (
    <div className="glass-card p-4 overflow-hidden">
      <div className="aspect-video h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.184532985021!2d-57.5170555!3d-25.331588099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945daef2e53406ed%3A0x8aa172866fa06537!2sFacultad%20de%20Ingenier%C3%ADa%20UNA!5e0!3m2!1ses!2spy!4v1743556154152!5m2!1ses!2spy"
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
