const Map = () => {
  return (
    <div className="overflow-hidden h-[300px] pb-[30%] relative">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.7874209118304!2d77.4215193!3d23.2508215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43b4baafd97b%3A0x1a6920b5593b937c!2sAnjana%20Inn!5e0!3m2!1sen!2sin!4v1713366883052!5m2!1sen!2sin"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute top-0 left-0 w-full h-full"
        sandbox="allow-same-origin allow-scripts"
      ></iframe>
    </div>
  );
};

export default Map;
