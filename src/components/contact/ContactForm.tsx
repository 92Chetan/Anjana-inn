import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const ContactForm = () => {
  return (
    <div className="max-w-lg max-h-[500px] dark:bg-zinc-800 bg-zinc-300 shadow-2xl rounded-lg flex justify-center transition-all duration-75 items-center">
      <form action="" className="grid grid-cols-1 gap-4 mx-4 my-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
          <div>
            <Label htmlFor="firstName">
              FirsName<span className="text-red-700">*</span>
            </Label>
            <Input
              className="dark:border-white border-black"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <Label htmlFor="lastName">
              LastName<span className="text-red-700">*</span>
            </Label>
            <Input
              className="dark:border-white border-black"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email">
            Email<span className="text-red-700">*</span>
          </Label>
          <Input
            className="dark:border-white border-black"
            type="email"
            placeholder="Enter your email"
            name="email"
          />
        </div>
        <div>
          <Label htmlFor="firstName">
            Message <span className="text-red-700">*</span>
          </Label>
          <Input
            className="dark:border-white h-32 border-black"
            name="message"
            placeholder="I am interested in learning more about..."
            type="text"
          />
        </div>
        <Button>Send Message</Button>
      </form>
    </div>
  );
};

export default ContactForm;
