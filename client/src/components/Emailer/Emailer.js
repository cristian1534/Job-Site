import emailjs from "@emailjs/browser";

const sendEmail = (toName, fromName, email, message, contactEmail) => {
  const templateParams = {
    to_name: toName,
    from_name: fromName,
    user_email: email,
    message: message,
    contact_email: contactEmail,
  };

  return emailjs.send(
    "service_fuh600g",
    "template_uafqpwl",
    templateParams,
    "v_UADccnP39H7plex"
  );
};

export default sendEmail;
