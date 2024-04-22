import { Button } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';


function About() {
    const teamMembers = [
        {
            name: 'Gautam Changedia',
            role: 'Backend Developer',
            responsibilities: [
                'Handling API development and management.',
                'Ensuring robust and efficient backend architecture.'
            ],
            imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
        },
        {
            name: 'Sujit Chougule',
            role: 'Review System Designer',
            responsibilities: [

                "Implementing review system for user feedback; managing chat/video calls with socket.io."
            ],
            imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
        },
        {
            name: 'Prasuk Durugkar',
            role: 'Frontend Developer',
            responsibilities: [
                'Crafting intuitive, responsive UIs; seamlessly integrating data for a smooth user experience'
            ],
            imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
        },
        {
            name: 'Rohit Dasari',
            role: 'Frontend Developer',
            responsibilities: [
                'Designing visually appealing dashboards for data visualization.'
            ],
            imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
        },
    ];

    return (
        <div className="container mx-auto py-8 px-4 mt-20 bg-gray-100 rounded-lg shadow-lg   h-auto n">
            <div className=" mb-8">
                <h1 className="text-4xl font-bold mb-4">About Legal Connect</h1>
                <p className="text-lg text-gray-700">Welcome to Legal Connect, where innovation meets legal solutions! Our team is passionate about leveraging technology to streamline legal processes and provide seamless experiences for our users.</p>
            </div>

            <div className="">
                {/* {
            teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={member.imageUrl} alt={member.name} className="w-full h-48 object-cover object-center" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-sm text-gray-600 mb-4"><strong>Role:</strong> {member.role}</p>
                    <p className="text-sm text-gray-600 mb-2"><strong>Responsibilities:</strong></p>
                    <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
                      {member.responsibilities.map((responsibility, idx) => (
                        <li key={idx}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            } */}
                <div className=' w-3/4 m-auto shadow-2xl p-10 about'>
                    <div className='flex  items-center gap-4 justify-between mb-10'>
                        <div><img src="https://res.cloudinary.com/davjp6p7v/image/upload/v1713821150/LegalConnect/gautu_swu00e.jpg" className=' rounded-full w-48 h-48 object-cover object-center' alt="" /></div>
                        <div>
                            <h1 className='text-2xl font-bold mb-4'>{teamMembers[0].name}</h1>
                            <h2 className='text-xl font-bold mb-4'>{teamMembers[0].role}</h2>
                            <p className='text-sm text-gray-600 mb-4 '>{teamMembers[0].responsibilities}</p>
                            <a variant='filled' color='indigo' className='  mb-4 bg-indigo-500  p-4 rounded-lg text-white uppercase font-bold ' target="_blank" href="https://res.cloudinary.com/davjp6p7v/image/upload/v1713821942/LegalConnect/Gautam_Resume_qyhvas.pdf">Resume</a>
                        </div>
                    </div>



                    <div className='flex  items-center gap-2 justify-between mb-10'>
                        <div >
                            <h1 className='text-2xl font-bold mb-4'>{teamMembers[1].name}</h1>
                            <h2 className='text-xl font-bold mb-4'>{teamMembers[1].role}</h2>
                            <p className='text-sm text-gray-600 mb-4 '>{teamMembers[1].responsibilities}</p>
                            <a variant='filled' color='indigo' className='  mb-4 bg-indigo-500  p-4 rounded-lg text-white uppercase font-bold ' target="_blank" href="https://res.cloudinary.com/davjp6p7v/image/upload/v1713821898/LegalConnect/Sujit_Resume_kypx9h.pdf">Resume</a>
                        </div>
                        <div><img src="https://res.cloudinary.com/davjp6p7v/image/upload/v1713821151/LegalConnect/suju_jucvaf.jpg" className=' rounded-full w-48 h-48 object-cover object-center' alt="" /></div>
                    </div>
                    <div className='flex  items-center  justify-between mb-10'>
                        <div><img src="https://res.cloudinary.com/davjp6p7v/image/upload/v1713821146/LegalConnect/prasu_lwke3q.jpg" className=' rounded-full w-48 h-48 object-cover object-center' alt="" /></div>
                        <div>
                            <h1 className='text-2xl font-bold mb-4'>{teamMembers[2].name}</h1>
                            <h2 className='text-xl font-bold mb-4'>{teamMembers[2].role}</h2>
                            <p className='text-sm text-gray-600 mb-4 '>{teamMembers[2].responsibilities}</p>
                            <a variant='filled' color='indigo' className='  mb-4 bg-indigo-500  p-4 rounded-lg text-white uppercase font-bold ' target="_blank" href="https://res.cloudinary.com/davjp6p7v/image/upload/v1713821981/LegalConnect/Prasuk_Resume_vu9hl3.pdf">Resume</a>
                        </div>
                    </div>
                    <div className='flex  items-center gap-2 justify-between mb-10'>
                        <div >
                        <h1 className='text-2xl font-bold mb-4'>{teamMembers[3].name}</h1>
                            <h2 className='text-xl font-bold mb-4'>{teamMembers[3].role}</h2>
                            <p className='text-sm text-gray-600 mb-4 '>{teamMembers[3].responsibilities}</p>
                            <a variant='filled' color='indigo' className='  mb-4 bg-indigo-500  p-4 rounded-lg text-white uppercase font-bold ' target="_blank" href="https://res.cloudinary.com/davjp6p7v/image/upload/v1713821942/LegalConnect/Gautam_Resume_qyhvas.pdf">Resume</a>
                        </div>
                        <div><img src="https://res.cloudinary.com/davjp6p7v/image/upload/v1713821135/LegalConnect/rohii_yuvxca.jpg" className=' rounded-full w-48 h-48 object-cover object-center' alt="" /></div>
                    </div>
                </div>
            </div>

            <div className=" mt-8">
                <h2 className=" text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-4">At Legal Connect, we are committed to revolutionizing the legal industry through innovative solutions and exceptional user experiences. Our team works tirelessly to ensure that legal processes are simplified and accessible to everyone.</p>
                <p className="text-lg text-gray-700">Explore our <Link to="/services" className="text-indigo-600 font-semibold hover:underline">services</Link> and <Link to="/contact" className="text-indigo-600 font-semibold hover:underline">contact us</Link> for more information.</p>
            </div>
        </div>
    );
}

export default About;
