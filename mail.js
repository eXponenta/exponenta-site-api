const auth = require("./auth");
const mailer = require("nodemailer");
const log = require("log4js").getLogger("Mailer");
      log.level = "all";
      
const transport = mailer.createTransport({
	service: "Yandex",
	auth: {
		user: auth.yandex_mail.login,
		pass: auth.yandex_mail.pass
	}
});

const sendEmail = async body => {

    const { email, message, token, subject } = body;

    const mess = {
        email, message, token, subject
    }
	//can't be empty
	if (!email || !token || !message || !subject) {
        
        log.warn("Empty fields : " + Object.keys(mess).filter( e=> !!mess[e]).join(", "));    
		return Promise.reject({ empty: true });
	}

	try {
		await transport.sendMail({
			from: auth.yandex_mail.login,
			replyTo: email,
			to: "me@exponenta.site",
			subject: subject,
			text: `Message :\n${message} \n\nFrom: ${email}`
		});

	} catch (e) {

        log.error(e);
		return Promise.reject(e);
	}

	return true;
};

module.exports = {
    sendEmail
}
