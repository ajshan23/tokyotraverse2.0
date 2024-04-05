import React from 'react'
import bg from "../assets/avatarback.png";
import pic1 from "../assets/about1.png";
import pic2 from "../assets/about2.png";
import man1 from "../assets/man1.png";
import man2 from "../assets/man2.png";
import man3 from "../assets/man3.png";
import man4 from "../assets/man4.png";
import "../style.css"
const About = () => {
  return (
    <div className="flex flex-col w-full">
      <div
        className="aboutavatar w-full h-40 md:h-[260px] "
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          
        }}
      >
        <div className="aboutus w-full h-full bg-[#F01F26] bg-opacity-80">
          <div className=" w-full h-full px-5 md:px-[120px] pb-6 flex justify-start items-end font-lexend text-xl md:text-4xl font-bold text-white">
            ABOUT US
          </div>
        </div>
      </div>
      <div className=" w-full flex flex-col pt-[21px] px-3 md:px-[120px] font-lexend pb-10">
        <div className="h-fit  w-full flex flex-col">
          <div className="text-sm pb-[31px]  text-gray-500">
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum,Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Illo, perferendis quisquam. Voluptatem
            dolorem molestiae illo voluptate excepturi nulla. Nam natus eveniet
            sit dolore reiciendis! Aperiam ad dolor quo eius consequatur libero
            exercitationem id, consectetur quos tenetur dignissimos illum iusto
            nihil veritatis modi obcaecati hic nostrum itaque, aliquid quod at?
            Debitis quidem similique iure laborum sapiente saepe vitae!
            Excepturi, suscipit reprehenderit!
          </div>
          <div className="font-semibold text-xl pb-[12px]">Quality First</div>
          <div className="text-sm text-gray-500 pb-[44px]">
            At [Your Company Name], we have been in the business of providing
            top-quality boxes for over [X years]. Our journey began with a
            simple mission: to offer our customers the finest selection of boxes
            tailored to their unique needs. Over the years, we've grown and
            evolved, but our commitment to quality and customer satisfaction
            remains unwavering.
          </div>
          <div className="h-[1.5px] w-full md:w-[855px] bg-[#F01F26]"></div>
        </div>
        <div className="flex flex-row  w-full relative">
          <div className="hidden md:flex w-[50%]">
            <img
              src={pic1}
              alt=""
              className="w-[499px] h-[621px] absolute -top-16"
            />
          </div>
          <div className="flex flex-col font-lexend ">
            <div className="text-3xl font-semibold pt-[57px]">
              OUR COMMITMENT
            </div>
            <div className="pt-[20px] font-semibold text-xl">Quality First</div>
            <div className="pt-[14px] w-screen md:w-[638px] text-sm text-gray-500">
              We understand the importance of packaging in preserving and
              presenting your products. That's why we take pride in offering
              only the highest quality boxes. Our products are designed to
              withstand the rigors of shipping, protect your valuable contents,
              and make a lasting impression on your customers.
            </div>
            <div className="pt-[20px] font-semibold text-xl">
              Variety and Customization
            </div>
            <div className="pt-[14px] w-screen md:w-[638px] text-sm text-gray-500">
              No two businesses are alike, and neither are their packaging
              needs. We offer a wide range of box types, sizes, and materials to
              cater to diverse industries and applications. Whether you need
              standard shipping boxes, custom-designed packaging, or specialty
              boxes for unique products, we've got you covered.
            </div>
            <div className="pt-[20px] font-semibold text-xl">
              Sustainability
            </div>
            <div className="pt-[14px]  w-screen md:w-[638px] pb-[45px] text-sm text-gray-500">
              We care about our planet, and we know you do too. That's why we
              are committed to sustainable practices. Many of our boxes are made
              from eco-friendly materials, and we constantly strive to reduce
              our environmental footprint. Join us in our journey towards a
              greener future.
            </div>
            <div className="h-[2px] w-screen md:w-[738px]  bg-[#F01F26]"></div>
          </div>
        </div>
        <div className="flex flex-row  w-full relative">
          <div className="flex flex-col font-lexend ">
            <div className="text-3xl font-semibold pt-[57px]">
              WHY CHOOSE US?
            </div>
            <div className="pl-9 pt-[32px] pb-[65px]">
              <ul className="list-disc text-sm text-gray-500 space-y-1 w-full">
                <li>
                  Experience: With decades of experience in the industry, we
                  have the knowledge and expertise to meet your packaging needs.
                </li>
                <li>
                  Customization: We offer tailored solutions to ensure your
                  boxes meet your exact specifications.
                </li>
                <li>
                  Quality Assurance: Our stringent quality control processes
                  ensure that every box leaving our facility meets the highest
                  standards.
                </li>
                <li>
                  Competitive Pricing: We offer competitive prices without
                  compromising on quality.
                </li>
                <li>
                  Customer Support: Our dedicated customer support team is here
                  to assist you every step of the way
                </li>
              </ul>
            </div>
            <div className="h-[2px] w-full md:w-[738px]  bg-[#F01F26]"></div>
            <div className="pt-[80px] pb-[25px] text-3xl ">OUR TEAM</div>
            <div className="pb-[60px] text-sm text-gray-600">
              Behind every great product is a dedicated team. Meet the
              individuals who make [Your Company Name] a trusted name in the box
              industry.
            </div>
          </div>
          <div className="hidden  md:flex w-[50%]">
            <img
              src={pic2}
              alt=""
              className="w-[499px] h-[621px] absolute -top-16"
            />
          </div>
        </div>
        <div className="flex flex-col h-fit border-y-2 py-5  border-red-600   justify-between">
         
          <div className=" md:flex md:flex-row justify-center items-center overflow-scroll element-class">
            <div className="flex md:flex-col justify-start items-start pl-10 md:pl-0 pr-[40px]  ">
              <img src={man1} alt="" className="w-32   md:w-[236px] md:h-[271px] " />
              <div className='flex flex-col h-full pl-6 md:pl-0  justify-center'>
              <h1 className="font-semibold pt-10  md:pt-[10px] pb-[2px]">Danny Chad</h1>
              <p className="text-sm font-sans">CEO</p>
              </div>
            </div>
            <div className="flex flex-row-reverse md:flex-col justify-start items-start pl-10 md:pl-0 pr-[40px]">
              <img
                src={man2}
                alt=""
                className="w-32   md:w-[236px] md:h-[271px]"
              />
               <div className='flex flex-col h-full pl-6 md:pl-0  justify-center'>
              <h1 className="font-semibold pt-[10px] pb-[2px]">
                Max Wellington
              </h1>
              <p className="text-sm font-sans">operaations manager</p>
              </div>
            </div>
            <div className="flex md:flex-col justify-start items-start pl-10 md:pl-0 pr-[40px]">
              <img
                src={man3}
                alt=""
                className="w-32   md:w-[236px] md:h-[271px]"
              />
              <div className='flex flex-col h-full pl-6 md:pl-0  justify-center'>
              <h1 className="font-semibold pt-[10px] pb-[2px]">Jacob Jabero</h1>
              <p className="text-sm font-sans">design head</p>
              </div>
            </div>
            <div className="flex flex-row-reverse md:flex-col justify-start items-start pl-10 md:pl-0 pr-[40px]">
              <img src={man4} alt="" className="w-32   md:w-[236px] md:h-[271px] " />
              <div className='flex flex-col h-full pl-6 md:pl-0  justify-center'>
              <h1 className="font-semibold pt-[10px] pb-[2px]">Lux Hassey</h1>
              <p className="text-sm font-sans">customer support team head</p>
              </div>
            </div>
          </div>
          
        </div>
        <div className="flex flex-col">
          <div className="mt-[50px] text-4xl font-sans font-semibold">CONTACT US</div>
          <div className="mt-[30px] text-sm text-gray-500">
            We appreciate your interest in [Your Company Name]. If you have any
            questions, need assistance with an order, or want to discuss your
            packaging requirements, please don't hesitate to reach out to us. We
            look forward to hearing from you.
          </div>
          <div className="mt-[30px] pl-8">
            <ul className="list-disc space-y-1 text-sm text-gray-500">
              <li>Phone: 9877656765,8753446290</li>
              <li>Email: Packbox2023@gmail.com</li>
              <li>Address: calicut,kerala</li>
            </ul>
          </div>
          <div className="mt-[20px] text-sm text-gray-500">
            Thank you for choosing [Your Company Name] for your box needs. We
            are dedicated to serving you with excellence, and we can't wait to
            be a part of your packaging success story.
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
