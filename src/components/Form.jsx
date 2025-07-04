import React, { useState, useRef } from 'react';
import heading from '../assets/images/logo-full.svg';
import upload from '../assets/images/icon-upload.svg';
import info_icon from '../assets/images/icon-info.svg';
import Ticket from './ticket';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [page, setPage] = useState(false)
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFile = (file) => {
    const maxSize = 500 * 1024; // 500KB in bytes

    if (file.size > maxSize) {
      setError('File too large. Please upload a photo under 500KB')
      return;
    }

    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
      setError('')
    } else {
      setError('Please upload a photo under 500KB')
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const removeImage = (e) => {
    e.stopPropagation(); // prevent triggering click to upload
    setAvatarPreview(null);
    inputRef.current.value = null; // clear input
  };

  const generateTicket = (e) => {
    e.preventDefault();

    let valid = true;

    // Validate name
    if (!name.trim()) {
      setNameError('Please enter your full name.');
      valid = false;
    } else {
      setNameError('');
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validate username
    if (!username.trim()) {
      setUsernameError('Please enter your username.');
      valid = false;
    } else {
      setUsernameError('');
    }

    // Validate avatar
    if (!avatarPreview) {
      setError('Please upload your avatar image.');
      valid = false;
    }

    if (!valid) return;

    console.log(`${name}, ${email}, ${username}`);
    setPage(true);
  };


  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center max-w-lg w-full mx-auto'>
      <header>
        <img className='mt-8 mb-12' src={heading} alt="Logo" />
      </header>

      <div className='mb-3'>
        {page === false ? (
          <h1 className='font-inconsolata text-white font-extrabold text-4xl text-center'>
            Your Journey to Coding Conf 2025 Starts Here!
          </h1>
        ) : (<h1 className='font-inconsolata text-white font-extrabold text-4xl text-center'>
          Congrats, <span className='bg-gradient-to-r from-[#f37362] to-[#ffffff] bg-clip-text text-transparent'>{name}</span>! Your ticket is ready
        </h1>)}

      </div>

      <div className='mb-7'>
        {page===false ? (
          <p className='font-inconsolata text-white text-center'>
          Secure your spot at next year's biggest coding conference.
        </p>) : (<p className='font-inconsolata text-white text-center'>
          We've emailed your ticket to <span className='font-bold text-orange-500'>{email}</span> and will send updates in the run up to the event.
        </p>)
        }
        
      </div>
        {page===false ? (
          <form className='w-full max-w-sm px-11 z-10' onSubmit={generateTicket}>
        <label className='font-inconsolata text-white font-semibold'>Upload Avatar</label>

        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`bg-white/10 flex flex-col justify-center items-center w-full border ${dragActive ? 'border-orange-500 bg-white/20' : 'border-dashed'
            } py-3 rounded-xl mt-1 mb-1 cursor-pointer ${error && 'border-red-600'}`}
        >
          {avatarPreview ? (
            <div className='flex flex-col items-center'>
              <div className='h-16 w-16 mb-2 rounded-lg overflow-hidden'>
                <img src={avatarPreview} alt="Avatar Preview" className='h-full w-full object-cover' />
              </div>
              <div className="flex gap-2 text-[10px]">

                <button type="button" onClick={removeImage} className="text-white font-inconsolata bg-white/20 px-2 rounded-sm underline hover:text-red-100">
                  Remove Image
                </button>
                <button type="button" onClick={handleClick} className="text-white font-inconsolata bg-white/20 px-2 rounded-sm underline hover:text-blue-100">
                  Change Image
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={`bg-white/20 h-8 mb-3 w-9 rounded-lg flex justify-center items-center `}>
                <img src={upload} alt="Upload Icon" className='w-5 h-5' />
              </div>
              <p className='font-inconsolata text-white text-[10px]'>Drag & drop or click to upload</p>
            </>
          )}
          <input type="file" ref={inputRef} hidden accept="image/*" onChange={handleFileChange} />
        </div>

        <div className='flex justify-start items-center gap-2 mb-2'>
          <img className='w-3' src={info_icon} alt="Info Icon" style={{
            filter: error
              ? 'invert(35%) sepia(87%) saturate(6183%) hue-rotate(355deg) brightness(90%) contrast(113%)'
              : 'none'
          }} />
          <p className={`font-inconsolata ${error ? 'text-red-600' : 'text-white'} text-[9px]`}>
            {error || 'Upload your photo (JPG or PNG, max size: 500KB)'}
          </p>
        </div>

        <label className='font-inconsolata text-white font-semibold'>Full Name</label>
        <input
          className={`w-full bg-white/10 border rounded-md mt-1 mb-2 px-3 py-[8px] text-[13px] text-white ${nameError && 'border-red-600'}`}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value.trim() !== '') setNameError('');
          }}
        />
        

        <label className='font-inconsolata text-white font-semibold'>Email Address</label>
        <input
          className={`w-full bg-white/10 border ${emailError && 'border-red-600'} rounded-md mt-1 mb-2 px-3 py-[8px] text-[13px] placeholder:text-[13px] text-white`}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            validateEmail(e.target.value)
          }}
          placeholder='example@email.com'
        />

        {emailError && (
          <div className="flex items-center gap-2 mb-2">
            <img
              className="w-3"
              src={info_icon}
              alt="Info Icon"
              style={{
                filter: 'invert(35%) sepia(87%) saturate(6183%) hue-rotate(355deg) brightness(90%) contrast(113%)'
              }}
            />
            <p className="font-inconsolata text-red-600 text-[9px]">{emailError}</p>
          </div>
        )}

        <label className='font-inconsolata text-white font-semibold'>GitHub Username</label>
        <input
          className={`w-full bg-white/10 border rounded-md mt-1 mb-2 px-3 py-[8px] text-[13px] placeholder:text-[13px] text-white  ${usernameError && 'border-red-600'}`}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='@yourusername'
        />

        <button className='mt-2 w-full font-inconsolata bg-orange-500 py-[5px] rounded-md' type='submit'>
          Generate My Ticket
        </button>
      </form>
        ) : (<span className='mt-24'><Ticket title={heading} profile={avatarPreview} name={name} username={username}/></span>)}
      
    </div>
  );
};

export default Form;
