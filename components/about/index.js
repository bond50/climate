'use client'
import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Autoplay} from 'swiper/modules';
import Image from "next/image";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const AboutSection = () => (
    <section id="about" className=" section about light-background ">
        <div className="container">
            <div className="row  justify-content-between align-items-center">
                {/* Slider Column */}
                <div
                    className="col-lg-7 mb-5 mb-lg-0 order-lg-2"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        loop={true}
                        autoplay={{delay: 5000}}
                        speed={600}
                        slidesPerView="auto"
                        pagination={{clickable: true}}
                        navigation={true}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 40,
                            },
                            1200: {
                                slidesPerView: 1,
                                spaceBetween: 1,
                            },
                        }}
                        className="swiper init-swiper" // Custom class used for additional styling
                    >
                        <SwiperSlide>
                            <Image width={1368} height={912} src="/image8.jpg" alt="Image" className="img-fluid"/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image width={1368} height={912} src="/image9.jpg" alt="Image" className="img-fluid"/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image width={1368} height={912} src="/image1.jpg" alt="Image" className="img-fluid"/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image width={1368} height={912} src="/image2.jpg" alt="Image" className="img-fluid"/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image width={1368} height={912} src="/image3.jpg" alt="Image" className="img-fluid"/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image width={1368} height={912} src="/image4.jpg" alt="Image" className="img-fluid"/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image width={1368} height={912} src="/image6.jpg" alt="Image" className="img-fluid"/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image width={1368} height={912} src="/image7.jpg" alt="Image" className="img-fluid"/>
                        </SwiperSlide>
                    </Swiper>
                </div>
                {/* Text Column */}
                <div className="col-lg-4 order-lg-1">
          <span className="section-subtitle" data-aos="fade-up">
          DIRECTORATE OF CLIMATE CHANGE
          </span>
                    <h1 className="mb-4" data-aos="fade-up">
                        Department of Environment, Water, Energy, Natural Resources and Climate Change
                    </h1>
                    <p data-aos="fade-up">
                        Strengthening Climate Change Governance <br/>
                        Community Empowerment and Capacity Building <br/>
                        Locally-Led Adaptation and Resilience Projects
                    </p>
                    <div className="mt-5" data-aos="fade-up">

                        <div className="features d-flex  gap-3 mb-4">
                            <div className="feature-item">
                                <i className="bi bi-check-circle-fill"></i>
                                <span>Act Now</span>
                            </div>
                            <div className="feature-item">
                                <i className="bi bi-check-circle-fill"></i>
                                <span>Act Together</span>
                            </div>
                            <div className="feature-item">
                                <i className="bi bi-check-circle-fill"></i>
                                <span>Act Differently</span>
                            </div>
                        </div>
                        <p className="banner-financed">
                            Financed by the Vihiga County Climate Change Fund and the National Treasury FLLoCA
                            Program
                        </p>
                        <div className="d-flex align-items-center justify-content-between banner-contact">
                            <span className='d-flex align-items-center justify-content-between'>
                                <i className="bi bi-envelope-fill me-2"></i>
                            <a href="mailto:directorclimate@Vihiga.go.ke">directorclimate@vihiga.go.ke</a>
                            </span>
                            <span>
                            <i className="bi bi-telephone-fill me-2"></i>
                           +254 799116630</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default AboutSection;
