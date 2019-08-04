import express, { Request, Response } from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import auth from '../middleware/auth';

const Contact = require('../models/Contact');

// @route       GET api/contacts
// @description Get all user contact
// @access      Private
router.get('/', auth, async (req: any, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      created_at: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/contacts
// @description Add new contact
// @access      Private
router.post('/', auth, async (req: Request, res: Response) => {
  const { email, name, phone, type } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: (<any>req).user.id
    });
    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       PUT api/contacts/:id
// @description Update contact
// @access      Private
router.put('/:id', auth, async (req, res) => {
  const { email, name, phone, type } = req.body;
  // Build contact object
  const contactFields: any = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;
  contactFields.update_at = Date.now;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    if (contact.user.toString() !== (<any>req).user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       Delete api/contacts
// @description Delete contact
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    if (contact.user.toString() !== (<any>req).user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ message: 'Contact Deleted!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
