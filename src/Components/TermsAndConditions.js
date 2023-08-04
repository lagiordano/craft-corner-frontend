import React, {useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function TermsAndConditions() {

    const navigate = useNavigate();

    useEffect( () => {
        document.title = "Craft Corner | Terms and Conditions";
        document.body.style = 'background: white;';
        window.scrollTo(0,0);
    }, [])

    return (
        <>
        <Container>
            <Row className="p-4 my-2 bg-warning text-secondary full-width-row">
                <Col>
                    <h2>Privacy Policy and Terms & Conditions</h2>
                </Col>
            </Row>
        </Container>
        <Container className="p-4 my-2 text-secondary">
            <Row>
                <Col>
                    <h4 className="p-3">Privacy Policy</h4>
                </Col>
            </Row>
            <Row className="text-start">
                <Col>
                    <p>Effective from date: 4th day of August, 2023</p>
                    <p>Craft Corner (the "Site") is owned and operated by Lauren Giordano. Lauren Giordano is the data controller and can be contacted at:</p>
                    <p>laurengiordano94@gmail.com</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Purpose</strong></p>
                    <p>The purpose of this privacy policy (this "Privacy Policy") is to inform users of our Site of the following:</p>
                    <ol>
                        <li>The personal data we will collect;</li>
                        <li>Use of collected data;</li>
                        <li>Who has access to the data collected;</li>
                        <li>The rights of Site users; and</li>
                        <li>The Site's cookie policy.</li>
                    </ol>
                    <p>This Privacy Policy applies in addition to the terms and conditions of our Site.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>GDPR</strong></p>
                    <p>For users in the European Union, we adhere to the Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016, known as the General Data Protection Regulation (the "GDPR"). For users in the United Kingdom, we adhere to the GDPR as enshrined in the Data Protection Act 2018.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Consent</strong></p>
                    <p>By using our Site users agree that they consent to:</p>
                    <ol>
                        <li>The conditions set out in this Privacy Policy.</li>
                    </ol>
                    <p>When the legal basis for us processing your personal data is that you have provided your consent to that processing, you may withdraw your consent at any time. If you withdraw your consent, it will not make processing which we completed before you withdrew your consent unlawful.</p>
                    <p>You can withdraw your consent by: Contacting the data controller (Lauren Giordano: laurengiordano94@gmail.com)</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Legal Basis for Processing</strong></p>
                    <p>We collect and process personal data about users in the EU only when we have a legal basis for doing so under Article 6 of the GDPR.</p>
                    <p>We rely on the following legal basis to collect and process the personal data of users in the EU:</p>
                    <ol>
                        <li>Users have provided their consent to the processing of their data for one or more specific purposes.</li>
                    </ol>
                    <br />
                    <p className="text-decoration-underline"><strong>Personal Data We Collect</strong></p>
                    <p>We only collect data that helps us achieve the purpose set out in this Privacy Policy. We will not collect any additional data beyond the data listed below without notifying you first.</p>
                    <p className="text-decoration-underline">Data Collected in a Non-Automatic Way</p>
                    <p>We may also collect the following data when you perform certain functions on our Site:</p>
                    <ol>
                        <li>Email address; and</li>
                        <li>Username; and</li>
                        <li>Password.</li>
                    </ol>
                    <p>This data may be collected using the following methods:</p>
                    <ol>
                        <li>Creating an account</li>
                        <li>Logging into an account</li>
                    </ol>
                    <br />
                    <p className="text-decoration-underline"><strong>How We Use Personal Data</strong></p>
                    <p>Data collected on our Site will only be used for the purposes specified in this Privacy Policy or indicated on the relevant pages of our Site. We will not use your data beyond what we disclose in this Privacy Policy.</p>
                    <p>The data we collect when the user performs certain functions may be used for the following purposes:</p>
                    <ol>
                        <li>To save data about users projects; and</li>
                        <li>For other users to see username of who shared a project.</li>
                    </ol>
                    <br />
                    <p className="text-decoration-underline"><strong>Who We Share Personal Data With</strong></p>
                    <p className="text-decoration-underline">Employees:</p>
                    <p>We may disclose user data to any member of our organisation who reasonably needs access to user data to achieve the purposes set out in this Privacy Policy.</p>
                    <p className="text-decoration-underline">Other Disclosures:</p>
                    <p>We will not sell or share your data with other third parties, except in the following cases:</p>
                    <ol>
                        <li>If the law requires it;</li>
                        <li>If it is required for any legal proceeding;</li>
                        <li>To prove or protect our legal rights; and</li>
                        <li>To buyers or potential buyers of this company in the event that we seek to sell the company.</li>
                    </ol>
                    <p>If you follow hyperlinks from our Site to another Site, please note that we are not responsible for and have no control over their privacy policies and practices.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>How Long We Store Personal Data</strong></p>
                    <p>User data will be stored until the purpose the data was collected for has been achieved.</p>
                    <p>You will be notified if your data is kept for longer than this period.</p>
                    <p>While we take all reasonable precautions to ensure that user data is secure and that users are protected, there always remains the risk of harm. The Internet as a whole can be insecure at times and therefore we are unable to guarantee the security of user data beyond what is reasonably practical.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Your Rights as a User</strong></p>
                    <p>Under the GDPR, you have the following rights:</p>
                    <ol>
                        <li>Right to be informed;</li>
                        <li>Right of access;</li>
                        <li>Right to rectification;</li>
                        <li>Right to erasure;</li>
                        <li>Right to restrict processing;</li>
                        <li>Right to data portability; and</li>
                        <li>Right to object.</li>
                    </ol>
                    <br />
                    <p className="text-decoration-underline"><strong>Children</strong></p>
                    <p>The minimum age to use our website is 18 years of age. We do not knowingly collect or use personal data from children under 18 years of age. If we learn that we have collected personal data from a child under 18 years of age, the personal data will be deleted as soon as possible. If a child under 18 years of age has provided us with personal data their parent or guardian may contact our data protection officer.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>How to Access, Modify, Delete, or Challenge the Data Collected</strong></p>
                    <p>If you would like to know if we have collected your personal data, how we have used your personal data, if we have disclosed your personal data and to who we disclosed your personal data, if you would like your data to be deleted or modified in any way, or if you would like to exercise any of your other rights under the GDPR, please contact our data controller here:</p>
                    <p>Lauren Giordano - laurengiordano94@gmail.com</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Do Not Track Notice</strong></p>
                    <p>Do Not Track ("DNT") is a privacy preference that you can set in certain web browsers. We do not track the users of our Site over time and across third party websites and therefore do not respond to browser-initiated DNT signals.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Cookie Policy</strong></p>
                    <p>A cookie is a small file, stored on a user's hard drive by a website. Its purpose is to collect data relating to the user's browsing habits. You can choose to be notified each time a cookie is transmitted. You can also choose to disable cookies entirely in your internet browser, but this may decrease the quality of your user experience.</p>
                    <p>We use the following types of cookies on our Site:</p>
                    <ol>
                        <li><u>Functional Cookies:</u> Functional cookies are used to remember the selections you make on our Site so that your selections are saved for your next visits.</li>
                    </ol>
                    <br />
                    <p className="text-decoration-underline"><strong>Modifications</strong></p>
                    <p>This Privacy Policy may be amended from time to time in order to maintain compliance with the law and to reflect any changes to our data collection process. When we amend this Privacy Policy we will update the "Effective Date" at the top of this Privacy Policy. We recommend that our users periodically review our Privacy Policy to ensure that they are notified of any updates. If necessary, we may notify users by email of changes to this Privacy Policy.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Complaints</strong></p>
                    <p>If you have any complaints about how we process your personal data, please contact us through the contact methods listed in the Contact Information section so that we can, where possible, resolve the issue. If you feel we have not addressed your concern in a satisfactory manner you may contact a supervisory authority. You also have the right to directly make a complaint to a supervisory authority.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Contact Information</strong></p>
                    <p>If you have any questions, concerns or complaints, you can contact our data controller, Lauren Giordano, at:</p>
                    <p>laurengiordano94@gmail.com</p>
                </Col>
            </Row>
        </Container>
        <Container className="p-4 my-2 text-secondary">
            <Row>
                <Col>
                    <h4 className="p-3">Terms and Conditions</h4>
                </Col>
            </Row>
            <Row className="text-start">
                <Col>
                    <p>These terms and conditions (the "Terms and Conditions") govern the use of Craft Corner (the "Site"). This Site is owned and operated by Lauren Giordano.</p>
                    <p>By using this Site, you indicate that you have read and understand these Terms and Conditions and agree to abide by them at all times.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Intellectual Property</strong></p>
                    <p>All content published and made available on our Site is the property of Lauren Giordano and the Site's creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our Site.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Acceptable Use</strong></p>
                    <p>As a user of our Site, you agree to use our Site legally, not to use our Site for illegal purposes, and not to:</p>
                    <ul>
                        <li>Harass or mistreat other users of our Site;</li>
                        <li>Violate the rights of other users of our Site;</li>
                        <li>Violate the intellectual property rights of the Site owners or any third party to the Site;</li>
                        <li>Hack into the account of another user of the Site;</li>
                        <li>Act in any way that could be considered fraudulent; or</li>
                        <li>Post any material that may be deemed inappropriate or offensive.</li>
                    </ul>
                    <p>If we believe you are using our Site illegally or in a manner that violates these Terms and Conditions, we reserve the right to limit, suspend or terminate your access to our Site. We also reserve the right to take any legal steps necessary to prevent you from accessing our Site.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>User Contributions</strong></p>
                    <p>Users may post the following information on our Site:</p>
                    <ul>
                        <li>Photos; and</li>
                        <li>Projects - including titles, descriptions, and url's.</li>
                    </ul>
                    <p>By posting publicly on our Site, you agree not to act illegally or violate these Terms and Conditions.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Accounts</strong></p>
                    <p>When you create an account on our Site, you agree to the following:</p>
                    <ol>
                        <li>You are solely responsible for your account and the security and privacy of your account, including passwords or sensitive information attached to that account.</li>
                    </ol>
                    <p>We reserve the right to suspend or terminate your account if you are using our Site illegally or if you violate these Terms and Conditions.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>User Goods and Services</strong></p>
                    <p>Our Site allows users to sell goods and services. We do not assume any responsibility for the goods and services users sell on our Site. We cannot guarantee the quality or accuracy of any goods and services sold by users on our Site. However, if we are made aware that a user is violating these Terms and Conditions, we reserve the right to suspend or prohibit the user from selling goods and services on our Site.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Links to Other Websites</strong></p>
                    <p>Our Site contains links to third party websites or services that we do not own or control. We are not responsible for the content, policies, or practices of any third party website or service linked to on our Site. It is your responsibility to read the terms and conditions and privacy policies of these third party websites before using these sites.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Limitation of Liability</strong></p>
                    <p>Lauren Giordano and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the Site.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Indemnity</strong></p>
                    <p>Except where prohibited by law, by using this Site you indemnify and hold harmless Lauren Giordano and our directors, officers, agents, employees, subsidiaries, and affiliates from any actions, claims, losses, damages, liabilities and expenses including legal fees arising out of your use of our Site or your violation of these Terms and Conditions.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Applicable Law</strong></p>
                    <p>These Terms and Conditions are governed by the laws of the State of New South Wales.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Severability</strong></p>
                    <p>If at any time any of the provisions set forth in these Terms and Conditions are found to be inconsistent or invalid under applicable laws, those provisions will be deemed void and will be removed from these Terms and Conditions. All other provisions will not be affected by the removal and the rest of these Terms and Conditions will still be considered valid.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Changes</strong></p>
                    <p>These Terms and Conditions may be amended from time to time in order to maintain compliance with the law and to reflect any changes to the way we operate our Site and the way we expect users to behave on our Site. We will notify users by email of changes to these Terms and Conditions or post a notice on our Site.</p>
                    <br />
                    <p className="text-decoration-underline"><strong>Contact Details</strong></p>
                    <p>Please contact us if you have any questions or concerns. Our contact details are as follows:</p>
                    <p>Lauren Giordano - laurengiordano94@gmail.com</p>
                    <br />
                    <p>Effective From Date: 4th day of August, 2023</p>

                </Col>
            </Row>
        </Container>
        </>
    )
}

export default TermsAndConditions;


