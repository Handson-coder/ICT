const { Movie, Favourite } = require('../models')
const { XenditInvoice } = require('../helpers/xenditPayment')
const sendNodemailer = require("../helpers/nodemailer");

class ControllerFavourite {
  static async findAllFavouriteList(req, res, next) {
    try {
      const result = await Favourite.findAll({
        where: {
          UserId: req.user.id
        },
        include: [
          {
            model: Movie,
          }
        ],
        order: [['id', 'DESC']]
      })
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async addMoviesToFavouriteList(req, res, next) {
    const { id } = req.params
    try {
      const foundMovie = await Movie.findByPk(id)
      if (!foundMovie) {
        throw ({ name: 'Data not found' })
      } else {
        await Favourite.create({
          UserId: req.user.id,
          MovieId: foundMovie.id,
          is_paid: false
        })
        res.status(201).json({ message: `${foundMovie.title} has been added to you favourite lists` })
      }
    } catch (err) {
      next(err)
    }
  }

  static async createPaymentTicket(req, res, next) { // kalau udah bayar
    const { id } = req.params
    const { email } = req.user;
    const randomID = Math.random().toString(36).slice(2);
    try {
      const foundFavourite = await Favourite.findByPk(id, {
        include: [
          {
            model: Movie
          }
        ]
      })
      const invoice = await XenditInvoice.createInvoice({
        externalID: `${randomID}`,
        payerEmail: email,
        description: `Payment for Movie ${foundFavourite.Movie.title} Ticket`,
        amount: foundFavourite.Movie.price,
        shouldSendEmail: true,
      });
      sendNodemailer(
        `${req.user.email}`,
        "Booking Ticket Payment Pending",
        `Hello, ${req.user.username}. Thank you for registering on XX-ICT. Here are your Movie Ticket informations:

        Your Name: ${req.user.username}
        Movie Title: ${foundFavourite.Movie.title}
        Movie Genre: ${foundFavourite.Movie.genre}
        Price: Rp. ${foundFavourite.Movie.price.toLocaleString("id-id")},-
        Your Payment ID: ${invoice.id} [ IMPORTANT !! , please copy this is ID for confirming your payment to Cinema XX-ICT ]

        Click this site to confirm your payment : ${invoice.invoice_url}`
      );
      res.status(201).json({
        invoice_id: invoice.id,
        external_id: invoice.external_id,
        status: invoice.status,
        amount: invoice.amount,
        merchant_name: invoice.merchant_name,
        payer_email: invoice.payer_email,
        expiry_date: invoice.expiry_date,
        invoiceURL: invoice.invoice_url,
        description: invoice.description
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async checkStatusPayment(req, res, next) {
    const { id } = req.params
    const { invoiceID } = req.body;
    try {
      const foundFavourite = await Favourite.findByPk(id, {
        include: [
          {
            model: Movie,
          }
        ]
      })
      const invoiceStatus = await XenditInvoice.getInvoice({
        invoiceID,
      });
      if (invoiceStatus.status == 'PENDING') {
        res.status(200).json({ message: `sorry your payment still on process or maybe you haven't paid it, please click this site for payment processing --> ${invoiceStatus.invoice_url} or you can see your email inbox to check it` })
      } else if (invoiceStatus.status == 'PAID') {
        sendNodemailer(
          `${req.user.email}`,
          "Registration Payment Succeess",
          `Hello, ${req.user.username}. Thank you for registering on Mediku. Here are your registration informations:
  
          Your Name: ${req.user.username}
          Movie Title: ${foundFavourite.Movie.title}
          Movie Genre: ${foundFavourite.Movie.genre}
          Price: Rp. ${foundFavourite.Movie.price.toLocaleString("id-id")},-
          
          Hoooraayy! your payment has confirmed by Xendit, Enjoy your Movie :)`
        );
        const data = {
          is_paid: true
        }
        let paid;
        const changeIsPaid = await Favourite.update(data, { where: { id }, returning: true })
        if (changeIsPaid[1][0].is_paid == true) {
          paid = `Hoooraayy! your payment has confirmed by Xendit, Enjoy your Movie :)`
        }
        res.status(200).json({ message: paid })
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteMovieFromFavList(req, res, next) {
    const { id } = req.params
    try {
      const foundFavourite = await Favourite.findOne({ where: { id } })
      if (foundFavourite) {
        await Favourite.destroy({ where: { id } })
        res.status(200).json({ message: `Success deleted from your Favourite List` })
      } else {
        throw ({ name: 'Data not found' })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerFavourite