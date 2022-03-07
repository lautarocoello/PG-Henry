const { Router } = require("express");
const addAdmin = Router();
const { UserAdmin } = require("../db.js");
const transporter = require("../mailer/mailer")

addAdmin.post("/", async (req, res, next) => {
  try {
    let { email, password, name, lastName, dni, adress} = req.body;
    if (!name || !email || !password || !lastName ||!dni || !adress) {
      return res.status(500).send("Necessary parameters not found");
    }
    const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);
    const lastNameUpper = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    const newAdmin = await UserAdmin.create({
      email,
      password,
      name: nameUpper,
      lastName: lastNameUpper,
      dni,
      adress

    });
    var mailOptions = {
      from: "excursionappmail@gmail.com",
      to: email,
      subject: "Bienvenido a ExcursionApp",
      html: `<img src= "https://img.icons8.com/color/48/000000/around-the-globe.png" />
      <h3>ExcursionApp</h3>
      <h3>Hola ${nameUpper} ${lastNameUpper}, su usuario fue creado con éxito. Ya puede empezar a utilizar la plataforma</h1> `
  }
  transporter.sendMail(mailOptions, (error, info) => {
    res.status(200).json(newAdmin);
});
  } catch (error) {
    res.status(500).send(error.message);
}
});

module.exports = addAdmin;