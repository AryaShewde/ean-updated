import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import "./contact.css"

export const ContactUs = () => {
    const [success, setSuccess] = useState(false);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_81df9w7', 'template_sznq15t', form.current, 'bOiH5S8-LWLV4B3mH')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
        setSuccess(true);
    };

    return (
            <form className='form' ref={form} onSubmit={sendEmail}>
                <label className='headtitle'>Is there any issue with Events and News app</label>
                <h1>Contact us</h1>
                <div>
                    <label className='lable'>Your Name</label>
                    <input type="text" name="user_name" required/>
                    <label className='lable'>Your Email</label>
                    <input type="email" name="user_email" required/>
                    <label className='lable'>Message</label>
                    <textarea name="message" />
                </div>
                <input className='btn' type="submit" value="Submit" required/>
                {success && <p>Responce has been sended</p>}
            </form>
    );
};