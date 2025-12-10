import React from 'react';
import './styles.css';

export const PrivacyPolicy: React.FC = () => {
	// const [language, setLanguage] = useState('en');

	// const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	setLanguage(e.target.value);
	// };

	return (
		<div className="terms-container">
			<div className="logo-banner">
				<img className="logo" src="/images/standart-canna.png" alt="CANNA Logo" />
			</div>

			<div className="main-content">
				<div className="content">
					<div className="container-head">
						{/* <div className="language-selector">
							<select value={language} onChange={handleLanguageChange}>
								<option value="en">Languages</option>
								<option value="en">English</option>
								<option value="es">Español</option>
								<option value="fr">Français</option>
							</select>
						</div> */}
						<h1 className="main-title">Privacy Notice</h1>
					</div>

					<div className="">
						<p>
							CANNA International trading as Cannaction ("we" or "us") takes the
							privacy of your information very seriously. Our Privacy Notice is
							designed to tell you, the user of our services about our practices
							regarding the collection, use and disclosure of personal information
							which may be provided to us via our websites, associated apps and other
							digital products we provide or collected through other means such as an
							online form, email or telephone communication.
						</p>

						<div className="section-card">
							<p className="text-h2">1. General</p>
							<p>
								1.1 This notice applies to information provided by our users, whether
								they are a customer or otherwise. In this notice "you" refers to any
								client or individual whose personal data we hold or process (other than
								our staff).
							</p>
							<p>
								1.2 In this notice references to the "Site" are references to any
								website, app or other means by which you provide personal data to us or
								access our services.
							</p>
							<p>
								1.3 This notice is governed by the Data Protection Act 2018 and General
								Data Protection Regulation (GDPR) as adopted into Dutch law. We are the
								data controller as meant in Article 13(1)a GDPR.
							</p>
						</div>

						<div className="section-card">
							<p className="text-h2">2. Basis on which we process personal data</p>
							<p>
								2.1 Personal data we hold about you will be processed either because:
							</p>
							<p>
								2.1.1 You have consented to the processing for the specific purposes
								described in this notice. This consent has been freely given,
								specifically, informed, and unambiguously provided. You have the right
								to withdraw your consent at any time. To withdraw consent, you may
								contact us at contact.international@canna.com or use the specific
								mechanism provided in our communications. Withdrawing consent will not
								affect the lawfulness of processing carried out based on consent before
								its withdrawal.
							</p>
							<p>
								2.1.2 The processing is necessary in order for us to comply with our
								obligations under a contract between you and us.
							</p>
							<p>
								2.1.3 The processing is necessary in pursuit of a legitimate interest. A
								legitimate interest in this context refers to a valid interest we or a
								third party have in processing your personal data, provided this
								interest is not overridden by your rights and interests in data privacy
								and security. We have conducted a legitimate interest assessment to
								ensure this balance.
							</p>
						</div>

						<div className="section-card">
							<p className="text-h2">3. Personal data we collect</p>
							<p>
								3.1 We may collect and process the following personal data (any
								information related to an identified or identifiable person) about you:
							</p>
							<p>
								3.1.1 Contact information we collect from you (for example, your name,
								address, telephone number, email address) ("Contact Information")
							</p>
							<p>
								3.1.2 Information regarding orders you have placed with us, including
								products you have ordered, shipping destinations the price of products
								you have ordered and any customisation ("Order Information")
							</p>
							<p>
								3.1.3 Information provided to us relating to payment including credit or
								debit card details ("Payment Information")
							</p>
							<p>
								3.1.4 A record and details of any correspondence or communication
								between you and us or relating to any complaint submitted to us
								("Communication Information")
							</p>
							<p>
								3.1.5 Details of your visits to the Site, the resources and pages that
								you access and any searches you make ("Technical Information")
							</p>
						</div>

						<div className="section-card">
							<p>
								3.2 Generally, we collect personal data directly from you. However, we
								may occasionally obtain data from third parties, including database
								providers. For instance, we may license data from a postal database to
								ensure efficient shipping. If we obtain your personal data from a third
								party, we will inform you of the source of this data and provide all
								required information in accordance with Article 14 of the GDPR. Your
								privacy rights under this notice are not affected, and you can still
								exercise all your rights contained within this notice.
							</p>

							<p>
								3.3 You are not required to provide any personal information, but the
								Site may not be operable without providing data to us. In particular we
								will not be able to fulfil an order without collecting some personal
								data from you.
							</p>

							<p>
								3.4 You may withdraw our authority to process your personal data (or
								request that we restrict our processing – see clause 8) at any time but
								we will be entitled to complete any orders we are processing and we may
								need to withhold some personal data for legal or other reasons.
								Withdrawal to process your personal data can be done by sending a mail
								with your request to: contact.international@canna.com.
							</p>

							<p>
								3.5 We will only collect and process personal data that is necessary for
								the purposes outlined in this notice, in accordance with the principle
								of data minimization under the GDPR.
							</p>
						</div>

						<div className="section-card">
							<p className="text-h2">4. How we process your personal data</p>
							<p>
								4.1 Please see the table below, which sets out the manner in which we
								will process the different types of personal data we hold:
							</p>

							<table className="privacy-table">
								<thead>
									<tr>
										<th>Purpose/Activity</th>
										<th>Type of data</th>
										<th>
											Lawful basis for processing including basis of legitimate interest
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>When we fulfil an order for products placed with us</td>
										<td>
											• Contact Information
											<br />
											• Order Information
											<br />• Payment Information
										</td>
										<td>
											• Performance of a contract with you
											<br />• Necessary for our legitimate interests (to ensure the
											fulfilment of customer orders)
										</td>
									</tr>
									<tr>
										<td>When you seek to cancel or change an order</td>
										<td>
											• Contact Information
											<br />
											• Order Information
											<br />
											• Payment Information
											<br />• Communication Information
										</td>
										<td>
											• Performance of a contract with you (managing changes and
											cancellations)
											<br />
											• Necessary for our legitimate interests (for running our business
											and to provide you with products and services requested and to fulfil
											our statutory obligations)
											<br />• Necessary to comply with legal obligation
										</td>
									</tr>
									<tr>
										<td>
											To manage our relationship with you which will include:
											<br />
											(a) Notifying you about changes to our terms or privacy notice
											<br />
											(b) Asking you to leave a review or take a survey
											<br />
											(c) When you submit a complaint
										</td>
										<td>
											• Contact Information
											<br />
											• Order Information
											<br />
											• Payment Information
											<br />
											• Communication Information
											<br />• Technical Information
										</td>
										<td>
											• Performance of a contract with you
											<br />
											• Necessary to comply with a legal obligation
											<br />• Necessary for our legitimate interests (improving our
											services, to keep our records updated and to study how customers use
											the services we provide)
										</td>
									</tr>
									<tr>
										<td>
											To administer and protect our business, including troubleshooting,
											data analysis, testing, system maintenance, support, reporting and
											hosting of data
										</td>
										<td>
											• Contact Information
											<br />• Technical Information
										</td>
										<td>
											• Necessary for our legitimate interests (for running our business,
											provision of administration and IT services, network security, to
											prevent fraud and in the context of a business reorganisation)
											<br />• Necessary to comply with a legal obligation
										</td>
									</tr>
									<tr>
										<td>
											To use data analytics to improve the Site, services, marketing,
											customer relationships and experiences
										</td>
										<td>
											• Technical Information
											<br />• Communication Information
										</td>
										<td>
											• Necessary for our legitimate interests (to define types of
											customers for our products and services, to keep our website updated
											and relevant, to develop our business and to inform our marketing
											strategy)
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="section-card">
							<p className="text-h2">5. Data Retention</p>
							<p>
								5.1 We will retain your personal data only for as long as necessary to
								fulfil the purposes for which it was collected, including for the
								purposes of satisfying any legal, accounting, or reporting requirements.
								In any case, your data will be deleted after the following deadlines
								expire:
							</p>

							<table className="privacy-table">
								<thead>
									<tr>
										<th>Category of personal data</th>
										<th>Length of retention</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Records relevant for tax purposes</td>
										<td>
											8 years from the end of the tax year to which the records relate
										</td>
									</tr>
									<tr>
										<td>
											Personal data processed in relation to a contract between you and us
										</td>
										<td>
											7 years from either the end of the contract or the date you last used
											our services or placed an order with us, being the length of time
											following a breach of contract in which a contract party is entitled
											to make a legal claim
										</td>
									</tr>
									<tr>
										<td>
											Personal data held on marketing or business development records
										</td>
										<td>
											3 years from the last date on which a data subject has interacted
											with us
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="section-card">
							<p>
								5.2 For any category of personal data not specifically defined in this
								notice, and unless otherwise specified by applicable law, the required
								retention period for any personal data will be deemed to be 7 years from
								the date of receipt by us of that data.
							</p>

							<p>
								5.3 The retention periods stated in this notice may be extended or
								shortened as necessary (for example, in the event that legal proceedings
								apply to the data or if there is an on-going investigation into the
								data).
							</p>

							<p>
								5.4 We review the personal data (and the categories of personal data) we
								are holding on a regular basis to ensure the data we are holding is
								still relevant to our business and is accurate. If we discover that
								certain data we are holding is no longer necessary or accurate, we will
								take reasonable steps to correct or delete this data as required.
							</p>

							<p>
								5.5 If you wish to request that data we hold about you is amended or
								deleted, please refer to Article 8 below, which explains your privacy
								rights.
							</p>
						</div>

						<div className="section-card">
							<p className="text-h2">6. Sharing your information</p>
							<p>
								6.1 We do not disclose any personal data you provide to any third
								parties other than as follows:
							</p>

							<ul>
								<li className="list">
									If you place an order, personal information relevant to your delivery
									will be shared with our shipping partner.
								</li>
								<li className="list">
									We may host personal data with third-party hosting partners. We ensure
									that these partners provide adequate protection for your data in
									accordance with GDPR requirements.
								</li>
								<li className="list">
									When conducting research to gain insights into the use of our services,
									we may share aggregated and anonymized results (not your personal data)
									with interested third parties.
								</li>
								<li className="list">
									We may disclose or share your personal data if required to comply with
									a legal obligation (e.g., a court order) or for the prevention of fraud
									or other crimes.
								</li>
								<li className="list">
									We may disclose your personal data to enforce any terms and conditions
									or agreements related to our services.
								</li>
								<li className="list">
									If we transfer some or all of our business and assets to a third party,
									we will transfer your personal data as part of that transaction. We
									will take steps to ensure that your privacy rights are protected, and
									the third party continues to comply with GDPR.
								</li>
								<li className="list">
									To protect our rights, property, and safety, or those of our users and
									third parties, we may exchange information with other companies and
									organizations for fraud protection and credit risk reduction.
								</li>
							</ul>

							<p>
								6.2 Except as detailed above, we will not disclose your personal data to
								third parties without your explicit consent. If we do share your data
								with a third party, we will take steps to ensure that your privacy
								rights are protected, and that the third party adheres to GDPR
								requirements.
							</p>
						</div>

						<div className="section-card">
							<p className="text-h2">7. Security</p>
							<p>
								7.1 We will take all reasonable steps to ensure that appropriate
								technical and organisational measures are carried out, taking into
								account the risks posed to the personal data we collect, including the
								risks of unlawful access, accidental loss, destruction or damage. These
								measures may include:
							</p>

							<p>
								7.1.1 Protecting our servers by both hardware and software firewalls
							</p>

							<p>
								7.1.2 Locating our data processing storage facilities in secure
								locations
							</p>

							<p>
								7.1.3 Encrypting all data stored on our server with an industry standard
								encryption method that encrypts the data between your computer and our
								server so that in the event of your network being insecure no data is
								passed in a format that could easily be deciphered
							</p>

							<p>
								7.1.4 When necessary, disposing of or deleting your data so it is done
								so securely
							</p>

							<p>7.1.5 Regularly backing up and encrypting all data we hold</p>

							<p>
								7.2 We will ensure that our employees are aware of their privacy and
								data security obligations. We will take reasonable steps to ensure that
								the employees of third parties working on our behalf are aware of their
								privacy and data security obligations.
							</p>

							<p>
								7.3 This notice and our procedures for handling personal data will be
								reviewed regularly and updated as necessary.
							</p>

							<p>
								7.4 Unfortunately, the transmission of information via the Internet is
								not completely secure. Although we will do our best to protect your
								personal data, we cannot guarantee the security of your data transmitted
								to the Site; any transmission is at your own risk. Once we have received
								your information, we will use the strict procedures and security
								features referred to in this clause to try to prevent unauthorised
								access.
							</p>

							<p>
								7.5 In the event of a data breach that poses a risk to your rights and
								freedoms, we will notify the relevant supervisory authority within 72
								hours, and if necessary, we will also inform you, in accordance with
								Articles 33 and 34 of the GDPR.
							</p>
						</div>

						<div className="section-card">
							<p className="text-h2">8. Your privacy rights</p>
							<p>
								8.1 The GDPR gives you the following rights in respect of personal data
								we hold about you:
							</p>

							<table className="privacy-table">
								<thead>
									<tr>
										<th>Right</th>
										<th>Description</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>The right to be informed</td>
										<td>
											You have the right to be informed about our data protection practices
											and processing activities. This notice provides details about how we
											collect, use, and protect your personal data. You should be informed
											at the time of data collection or when we receive your data from
											third parties.
										</td>
									</tr>
									<tr>
										<td>The right of access</td>
										<td>
											You can request access to the personal data we hold about you by
											making a Subject Access Request (SAR). This request can be made free
											of charge, though we may charge for repeat requests where reasonable.
											To make a SAR, please contact us as described below.
										</td>
									</tr>
									<tr>
										<td>The right to rectification</td>
										<td>
											Please inform us if information we hold about you is incomplete or
											inaccurate in any way and we will update our records as soon as
											possible, but in any event within one month. We will rectify any
											inaccurate or incomplete data without undue delay and within one
											month of receiving your request.
										</td>
									</tr>
									<tr>
										<td>The right to erasure (the 'right to be forgotten')</td>
										<td>
											Please notify us if you no longer wish us to hold personal data about
											you (although in practice it is not possible to provide our services
											without holding your personal data). Unless we have reasonable
											grounds to refuse the erasure, on receipt of such a request we will
											securely delete the personal data in question within one month. The
											data may continue to exist in certain backups, but we will take steps
											to ensure it will not be accessible.
											<br />
											<br />
											We will communicate the erasure to any third parties to whom we have
											passed the same information.
											<br />
											<br />
											We may refuse erasure where processing is necessary to comply with a
											legal obligation, for the exercise of freedom of expression, or for
											public interest purposes. While certain data may exist in backups, we
											will take steps to ensure it is not accessible or processed further.
										</td>
									</tr>
									<tr>
										<td>The right to restrict processing</td>
										<td>
											You can request that we no longer process your personal data in
											certain ways, whilst not requiring us to delete the same data. You
											may request the restriction of processing if you contest the accuracy
											of your data, the processing is unlawful, or you have objected to the
											processing and we are verifying whether our legitimate grounds
											override yours.
										</td>
									</tr>
									<tr>
										<td>The right to data portability</td>
										<td>
											You have right to receive copies of personal data we hold about you
											in a commonly used and easily storable format (please let us know a
											format which suits you). You may also request that we transfer your
											personal data directly to third party (where technically possible).
										</td>
									</tr>
									<tr>
										<td>The right to object</td>
										<td>
											Unless we have overriding legitimate grounds for such processing, you
											may object to us using your personal data if you feel your
											fundamental rights and freedoms are impacted. You may also object if
											we use your personal data for direct marketing purposes (including
											profiling) or for research or statistical purposes. Please notify
											your objection to us and we will gladly cease such processing, unless
											we have overriding legitimate grounds.
										</td>
									</tr>
									<tr>
										<td>
											Rights with respect to automated decision-making and profiling
										</td>
										<td>
											You have a right not to be subject to automated decision-making
											(including profiling) when those decisions have a legal (or similarly
											significant) effect on you. You are not entitled to this right when
											the automated processing is necessary for us to perform our
											obligations under a contract with you, it is permitted by law, or if
											you have given your explicit consent.
										</td>
									</tr>
									<tr>
										<td>Right to withdraw consent</td>
										<td>
											If we are relying on your consent as the basis on which we are
											processing your personal data, you have the right to withdraw your
											consent at any time. Even if you have not expressly given your
											consent to our processing, you also have the right to object (see
											above). Withdrawing your consent will not affect the lawfulness of
											the processing carried out based on your consent before its
											withdrawal.
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="section-card">
							<p>
								8.2 All Subject Access Requests (SARs) and other requests or
								notifications regarding your rights under the GDPR should be submitted
								in writing to us using the contact details provided in Article 13 of
								this notice.
							</p>

							<p>
								8.3 We will aim to respond to such requests as promptly as possible. In
								any case, we will respond within one month of receiving your request. If
								the request is complex or numerous, we may extend the response period by
								up to two additional months. We will inform you if an extension is
								needed and provide an explanation for the delay.
							</p>
						</div>

						<div className="section-card">
							<p className="text-h2">9. Data Breaches</p>
							<p>
								9.1 If personal data we hold about you is subject to a breach or
								unauthorized disclosure or access, we will report the breach to the
								Information Commissioner's Office (ICO) without undue delay and, where
								feasible, within 72 hours of becoming aware of the breach, as required
								by Article 33 of the GDPR.
							</p>

							<p>
								9.2 If the breach is likely to result in a high risk to your rights and
								freedoms, we will notify you of the breach without undue delay. This
								notification will include details of the nature of the breach, the
								likely consequences, and the measures we have taken or plan to take to
								address the breach and mitigate any potential adverse effects, as
								outlined in Article 34 of the GDPR.
							</p>
						</div>

						<div className="section-card">
							<p className="text-h2">10. Other websites</p>
							<p>
								10.1 Our Site may contain links and references to other websites. Please
								be aware that this notice does not apply to those websites.
							</p>

							<p>
								10.2 We cannot be responsible for the privacy policies and practices of
								sites that are not operated by us, even if you access them via the Site.
								We recommend that you check the policy of each site you visit and
								contact its owner or operator if you have any concerns or questions.
							</p>

							<p>
								10.3 In addition, if you came to this Site via a third party site, we
								cannot be responsible for the privacy policies and practices of the
								owners or operators of that third party site and recommend that you
								check the policy of that third party site and contact its owner or
								operator if you have any concerns or questions.
							</p>
						</div>

						<div className="section-card">
							<p className="text-h2">
								11. Transferring your information outside Belgium
							</p>
							<p>
								11.1 As part of the services provided to you the information you provide
								to us may be transferred to, processed and stored at, countries or
								international organisations outside of Belgium.
							</p>

							<p>
								11.2 We have customers who are outside of Belgium and in those
								circumstances personal data will be transferred outside of the Belgium
								(for instance to shipping partners).
							</p>

							<p>
								11.3 We will not transfer the personal data of Belgian customers in a
								systematic way outside of Belgium but there may be circumstances in
								which certain personal information is transferred outside of Belgium, in
								particular:
							</p>

							<p>
								11.3.1 If you use our Site while you are outside Belgium, your
								information may be transferred outside Belgium in order to provide you
								with our services
							</p>

							<p>
								11.3.2 We may communicate with individuals or organisations outside of
								Belgium in delivering our services, those communications may include
								personal information (such as contact information) for example you may
								be outside of Belgium when we communicate with you
							</p>

							<p>
								11.3.3 From time to time your information may be stored in devices which
								are used by our staff outside of Belgium.
							</p>

							<p>
								11.4 If we transfer your information outside of Belgium, and the third
								country or international organisation in question has not been deemed by
								the ICO to have adequate data protection laws, we will provide
								appropriate safeguards and we will be responsible for ensuring your
								privacy rights continue to be protected as outlined in this notice. If
								you would like to obtain details of the safeguards we have put in place
								then please contact us at: contact.international@canna.com.
							</p>

							<p>
								11.5 By submitting your personal information, you consent to the
								transfer, storage, or processing of your information outside Belgium as
								described in this notice. If transfers are made to countries without
								adequate data protection laws and in the absence of appropriate
								safeguards, you will be informed of the risks involved before giving
								your explicit consent.
							</p>
						</div>

						<div className="section-card">
							<p className="text-h2">
								12. Notification of changes to the contents of this notice
							</p>
							<p>
								We will post clear and easily understandable details of any changes to
								our policy on the Site to help ensure you are always aware of the
								information we collect, how we use it, and in what circumstances, if
								any, we share it with other parties.
							</p>
						</div>

						<div className="section-card">
							<p className="text-h2">13. Contact us</p>
							<p>
								If at any time you would like to contact us with your views about our
								privacy practices, or with any enquiry or complaint relating to your
								personal information or how it is handled, you can do so via the
								following email address: contact.international@canna.com.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
