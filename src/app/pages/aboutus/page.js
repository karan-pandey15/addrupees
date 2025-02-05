import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/navbar/page";
import TopNav from "@/app/components/topnav/page";
import aboutImg from "../../../../public/aboutImg.png";
import ceo_photo from "../../../../public/ceo_photo1.JPG";
import Footer from "@/app/components/footer/page";
import ApplynowBtn from "@/app/components/applynowbtn/page";
import "../../styles.css";

const About = () => {
  return (
    <div>
      <TopNav />
      <Navbar />
      <div style={{ backgroundColor: "#E7E5E5" }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 py-5">
              <h2
                style={{
                  fontWeight: "700",
                  fontSize: "40px",
                  color: "#264653",
                }}
              >
                About <span style={{ color: "#036E8C" }}>Add</span>
                <span style={{ color: "#3E9B74" }}>Rupee</span>
              </h2>
              <p>
                Add Rupee is a platform which helps its customers avail multiple
                financial services like secured loans, unsecured loans, cards,
                investments and saving options. Our team evaluate and collate
                all major market offerings, and make this data available at one
                place for our customer to analyse before making decision. The
                process generates good alternatives and helps them select the
                best deal/plan as per their need.
              </p>
              <br />
              <p>
                We are an independent online search and comparison platform.
                Once the customer applies on our platform for any of the
                product, our Network associates will connect personally,
                understand requirements, and assist with one-to-one interaction.
              </p>
              <br />
              <p>
                We are a dynamic team of professionals, who believe in creating
                a service which helps our customers in taking an informed
                decision.
              </p>
              <button
                className="py-2 px-4 button_class"
                style={{
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#036E8C",
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  href="/pages/customersignup"
                >
                  Apply Now
                </Link>
              </button>
            </div>
            <div className="col-12 col-lg-6">
              <Image src={aboutImg} alt="..." width={500} height={500} />
            </div>
          </div>
        </div>
        <section className="aboutVision-Container">
          <div className="container p-5">
            <h3
              style={{
                color: "#3E9B74",
                fontSize: "30px",
                fontWeight: "700",
              }}
              className="text-start pb-2"
            >
              Our Dream for a Stronger Financial Future
            </h3>
            <p style={{ color: "#edede9" }}>
              At AddRupee, our vision is to empower individuals and businesses
              with financial solutions that foster growth and prosperity. We
              aspire to become the trusted partner for those seeking financial
              stability, offering tailored loan products and services that
              enhance their lives. With a commitment to integrity, transparency,
              and customer-centric values, we aim to make a lasting impact on
              the financial well-being of our clients. Our vision is to be the
              bridge to a brighter financial future, where dreams are realized
              and opportunities abound.
            </p>
            <button
              className="py-2 px-4 button_vision-class"
              style={{
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#3e9d7c",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                href="/pages/customersignup"
              >
                Apply Now
              </Link>
            </button>
          </div>
        </section>
        <section>
          <div className="container py-5">
            <h3
              className="text-center"
              style={{ color: "#264653", fontSize: "40px", fontWeight: 700 }}
            >
              Meet Our Team Members
            </h3>
            <p>
              At AddRupee, we have a dedicated team of professionals who are
              passionate about helping you achieve your financial goals. Our
              diverse and experienced team members bring a wealth of knowledge
              and expertise to provide you with top-notch financial solutions.
              Get to know the individuals who work tirelessly to make our vision
              a reality.
            </p>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <div className="card my-3" style={{ width: "100%" }}>
                  <Image
                    className="card-img-top img-fluid rounded-start"
                    src={ceo_photo}
                    alt="..."
                  />
                  <div className="card-body text-dark">
                    <h5 className="card-title "> Pradeep Mishra</h5>
                    <p className="card-text ">
                      I'm Pradeep Mishra, an MBA graduate, and I'm like the
                      captain of a company called Addrupee, steering it towards
                      success.
                    </p>
                    <button
                      className="py-2 px-2 button_class"
                      style={{
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: "#036E8C",
                      }}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        href="/"
                      >
                        Read more
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="col-12 col-md-6 col-lg-4">
                <div className="card my-3" style={{ width: "100%" }}>
                  <Image className="card-img-top" src={team2} alt="..." />
                  <div className="card-body text-dark">
                    <h5 className="card-title text-dark">Mamta Mishra</h5>
                    <p className="card-text">
                      I'm Mamta Mishra, an MBA graduate, and I'm like the
                      captain of a company called Addrupee, steering it towards
                      success.
                    </p>
                    <button
                      className="py-2 px-2 button_class"
                      style={{
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: "#036E8C",
                      }}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        href="/"
                      >
                        Read more
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 justify-content-center">
                <div className="card my-3" style={{ width: "100%" }}>
                  <Image className="card-img-top" src={team3} alt="..." />

                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <button
                      className="py-2 px-2 button_class"
                      style={{
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: "#036E8C",
                      }}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        href="/"
                      >
                        Read more
                      </Link>
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
      <ApplynowBtn />
      <Footer />
    </div>
  );
};

export default About;
