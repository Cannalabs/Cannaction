import React from 'react';
import './styles.css';

export const TermsConditions: React.FC = () => {
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
						<h1 className="main-title">Terms and Conditions</h1>
					</div>

					<div className="">
						<div className="company-info">
							<p>
								CANNA INTERNATIONAL N.V., trading as Cannaction, a company registered in
								Belgium with company number: 0685.559.475, and whose registered address
								is at Marsveldplein 5 (1050) Elsene, Belgium.
							</p>
						</div>

						<div
							style={{
								marginBottom: '4rem',
							}}
						></div>

						<p>
							CANNA International trading as Cannaction ("we" or "us") takes the
							privacy of your information very seriously...
						</p>

						<div className="section-card">
							<h2 className="text-h2">Article 1: Definitions</h2>
							<div className="definitions-list">
								<p>
									<strong>1.1 General Terms and Conditions:</strong> all terms and
									conditions of this document;
								</p>
								<p>
									<strong>1.2 Cannaction:</strong> the loyalty program of Canna
									International;
								</p>
								<p>
									<strong>1.3 Online Services:</strong> every service that Canna offers
									in Cannaction;
								</p>
								<p>
									<strong>1.4 Opposite Party:</strong> the party with which Canna
									conducts business;
								</p>
								<p>
									<strong>1.5 Parties:</strong> Canna and the Opposite Party;
								</p>
								<p>
									<strong>1.6 Site:</strong> the internet portal of Cannaction;
								</p>
								<p>
									<strong>1.7 The Agreement:</strong> the agreement between the Parties
									that enables the Opposite Party to use Cannaction.
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">Article 2: Applicability</h2>
							<div className="definitions-list">
								<p>
									<strong>2.1</strong> The Opposite Party´s general terms and conditions
									are expressly rejected.
								</p>
								<p>
									<strong>2.2</strong> In case any stipulation of these General Terms and
									Conditions is deemed void, nullified or invalid, for any reason, the
									remaining terms and conditions shall remain in force. If one or more
									provisions are invalid, the Parties will negotiate a substitute clause
									that closely reflects the original intent and is enforceable.
								</p>
								<p>
									<strong>2.3</strong> Canna may amend the General Terms and Conditions
									at any time by posting amended terms and conditions on the Site. The
									applicable terms and conditions for the purchase will be the terms and
									conditions at the time of the purchase.
								</p>
								<p>
									<strong>2.4</strong> The terms and conditions relate to purchases
									through the Site. Please do check our Privacy Policy for information on
									how we collect and use personal data.
								</p>
								<p>
									<strong>2.5</strong> These terms and conditions together with the
									receipt of order and dispatch emails we send to you will form the
									agreement between the Parties.
								</p>
								<p>
									<strong>2.6</strong> By using the site in any way, you confirm that you
									accept these terms and conditions and that you agree to comply with
									them.
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">Article 3: Offers and orders</h2>
							<div className="definitions-list">
								<p>
									<strong>3.1</strong> Our Online Services are accessible through our
									Site. After an order is placed, you will receive an email acknowledging
									receipt. This does not constitute acceptance of the order. An order is
									accepted only when we send a confirmation email stating that the
									products have been dispatched. At that point, a contract between the
									Parties is formed. Once the confirmation email is sent, no part of the
									order can be canceled or modified without Canna's prior written
									consent.
								</p>
								<p>
									<strong>3.2</strong> In case of full or partial cancellation or
									modification of an order, Canna is entitled to claim damages amounting
									to 15% of the purchase price, without prejudice to other remedies. The
									Opposite Party agrees this percentage is reasonable and proportionate
									to protect Canna's legitimate interests and not a penalty.
								</p>
								<p>
									<strong>3.3</strong> The order confirmation will include a delivery
									estimate. This estimate is non-binding and approximate. Canna will make
									reasonable efforts to deliver the items on the agreed date but is not
									liable for failure to meet the stated delivery time. An order can be
									canceled or changed prior to dispatch by mailing Canna on: [MAIL
									ADDRESS].
								</p>
								<p>
									<strong>3.4</strong> If Canna is unable to supply a product, we will
									notify the Opposite Party via email and, if applicable, provide a full
									refund, including any paid delivery costs, within 14 working days.
								</p>
								<p>
									<strong>3.5</strong> Our Online Services are available exclusively to
									commercial users subscribed to the Cannaction program. We reserve the
									right to reject or cancel any order at any time, for any reason.
								</p>
								<p>
									<strong>3.6</strong> The Opposite Party is responsible for ensuring
									compliance with all local laws regarding the use of our products and
									Online Services. Our products must not be used for any illegal purpose.
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">Article 4: Payment and prices</h2>
							<div className="definitions-list">
								<p>
									<strong>4.1</strong> Product prices are quoted in EURO and exclude
									applicable taxes.
								</p>
								<p>
									<strong>4.2</strong> All prices are exclusive shipping costs to the
									destination agreed on in the order. The price of a product listed does
									not include delivery charges. Canna reserves the right to charge
									reasonable administrative costs and handling fees.
								</p>
								<p>
									<strong>4.3</strong> The Opposite Party must comply with all applicable
									laws and regulations of the country for which the products are
									destined. We will not be liable or responsible if you breach any law.
								</p>
								<p>
									<strong>4.4</strong> Orders will be dispatched only after payment is
									received.
								</p>
								<p>
									<strong>4.5</strong> In case of an incorrect pricing error, Canna is
									not obliged to supply the item at the misquoted price, provided notice
									is given before order acceptance.
								</p>
								<p>
									<strong>4.6</strong> Canna may withhold transactions if the Opposite
									Party is found in breach of the Agreement or these General Terms.
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">Article 5: Availability and products</h2>
							<div className="definitions-list">
								<p>
									<strong>5.1</strong> Products offered via Cannaction are not intended
									for sale outside the Cannaction program, meaning that the products can
									only be obtained through the point system of the Cannaction program.
								</p>
								<p>
									<strong>5.2</strong> Any order is subject to availability of the
									products ordered. We cannot and do not guarantee that any item shown on
									the Site will be available continuously or at any given time.
								</p>
								<p>
									<strong>5.3</strong> If Canna is unable to supply an item for reasons
									beyond its control, Canna will not be liable, except to ensure the
									Opposite Party is not charged for the unavailable item.
								</p>
								<p>
									<strong>5.4</strong> Unless otherwise indicated, Canna is not the
									manufacturer of the products sold on the Site. Actual product packaging
									and materials may vary from the images and descriptions on the Site.
									Always refer to product labels and directions before use. Canna assumes
									no liability for inaccuracies or misstatements by manufacturers or
									third parties.
								</p>
								<p>
									<strong>5.5</strong> The images of products on the Site are for
									illustrative purposes only. Your products may vary slightly from those
									images.
								</p>
								<p>
									<strong>5.6</strong> Canna is the owner or licensee of all intellectual
									property rights on the Site, and of the material published on it. Those
									works are protected by copyright laws and treaties around the world.
									All such rights are reserved. We do not grant any license or any
									entitlement to any parties other than that of consulting the Site. The
									content on the Site is provided for general information only.
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">
								Article 6: Numbers, sizes, weights and other data
							</h2>
							<div className="definitions-list">
								<p>
									<strong>6.1</strong> Minor deviations in the delivered products with
									regard to stated sizes, weights, numbers, colours and other such data
									do not constitute a failure or breach by Canna.
								</p>
								<p>
									<strong>6.2</strong> Devations are deemed minor in case the margin of
									deviation does not exceed 10% above or below the stated specifications.
									Samples shown or provided are indicative only.
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">Article 7: Packaging</h2>
							<div className="definitions-list">
								<p>
									The Opposite Party will not amend the products provided, unless Canna
									has given permission in advance to do so.
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">Article 8: Complaints</h2>
							<div className="definitions-list">
								<p>
									If the Opposite Party wishes to reject faulty products, Canna must be
									notified within a reasonable period of discovering the defect, and for
									obvious defects, immediately within 30 days. Failure to notify within
									this time frame will forfeit the right to reject the products, and
									Canna will have no liability. Faulty products should be returned either
									in person or by post, and Canna will bear the postage costs. Any
									further complaints can be send to [MAILADDRESS].
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">Article 9: Retention of title</h2>
							<div className="definitions-list">
								<p>
									Title to the products delivered to the Opposite Party will remain
									vested in Canna until they have been exchanged via the Cannaction
									program. The Opposite Party is not permitted to sell, pledge, assign,
									re-sell, lease, sub-let or otherwise dispose of, or grant any right or
									license to use, any products delivered as long as title to those
									products is vested in Canna. The Opposite Party will make sure that no
									encumbrance will affect tehe products as long as title to those
									products is vested in Canna. In case of seizure or otherwise claimed or
									possesed by any third party, the Opposite Party will promptly inform
									Canna and ensure that the products will be excluded from the claim. In
									case the Opposite Party fails to adhere to the Agreement, Canna has the
									right to recover the products without notice of default being required.
									The Opposite Party irrevocably authorizes Canna to enter any and all
									premises where any of the products are located without claim of
									trespass and this shall constitute Canna´s full and continuing
									authority for doing so.
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">Article 10: Recommendations</h2>
							<div className="definitions-list">
								<p>
									The Opposite Party acknowledges and accepts it is fully liable and
									responsible for its decisions relating to such information, advice,
									and/or recommendations provided by Canna.
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">Article 11: Confidentiality</h2>
							<div className="definitions-list">
								<p>
									All information provided by Canna to the Opposite Party is to be
									considered confidential information, and is owned by Canna. The
									Opposite Party will (I) hold the information in strict confidence,
									using the reasonable care that the Opposite Party uses to protect is
									own confidential information; (II) will not disclose information to any
									third party other then for carrying out its obligations in the
									Agreement or is bound by law to do so; (III) will implement appropriate
									security measures consistent with the best practices or otherwise take
									necessary precautions to prevent unauthorized or unlawful access or
									processing, accidental loss, destruction or damage. This article does
									not intend to apply to information that is intended to be distributed
									among Opposite Party´s customers, such as general marketing and
									promotional materials. Unless Canna granted permission in writing, the
									Opposite Party will not disclose the Agreement to any third party.
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">Article 12: Liability</h2>
							<div className="definitions-list">
								<p>
									<strong>12.1</strong> Subject as expressly provided in these terms and
									conditions, as the Opposite Party is not a consumer, all warranties,
									conditions or other terms implied by statute or common law are excluded
									to the fullest extent permitted by law. Nothing in these General Terms
									and Conditions or any Contract(s) excludes or limits either Party´s
									liability for (I) death or personal injury caused by negligence or (II)
									fraud or fraudulent misrepresentation; or (III) any other liablility
									which cannot be limited or excluded by applicable law.
								</p>
								<p>
									<strong>12.2</strong> Any claim, based on any defect in quality or
									condition or failure to meet its specification, in respect of the items
									supplied, is notified to us in accordance with these terms and
									conditions. We shall then only replace or repair the items free of
									charge or refund you the price of the item. Canna is not liable for any
									loss of business, loss of opportunity, loss of revenue, loss of
									profits, or any indirect, incidental, consequential or special damage
									or loss.
								</p>
								<p>
									<strong>12.3</strong> Canna is not liable for damage caused to goods
									owned by third parties or any third party claims. Canna is not
									responsible for the manner or way in which the products are used by the
									Opposite Party. The Opposite Party represents and warrants that it will
									comply with all applicable laws and regulations in relation to the
									products.
								</p>
								<p>
									<strong>12.4</strong> Any liability under or in connection with these
									Terms and Conditions shall at all times be limited to the aggregate
									invoiced amount of the relevant order under which the Opposite Party
									alleges a breach has occurred.
								</p>
								<p>
									<strong>12.5</strong> In these terms and conditions, all articles
									mentioning Canna means Canna and its affiliates, and their respective
									directors, officers, employees, agents, representatives and
									contractors.
								</p>
								<p>
									<strong>12.6</strong> If we fail to insist that you perform any of your
									obligations under these Terms and Conditions, or if we do not enforce
									our rights against you, or if we delay in doing so, that will not mean
									that we have waived our rights against you and will not mean that you
									do not have to comply with those obligations.
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">Article 13: Force Majeure</h2>
							<div className="definitions-list">
								<p>
									<strong>13.1</strong> If Canna is unable to perform or continue to
									perform its obligations under the Contract due to a Force Majeure
									Event, Canna is: (I) not liable for any of its obligations and not
									considered to be in default for any delay or failure to perform, and
									(II) entitled, without any obligation to pay damages, to suspend or
									terminate the Contract, in whole or in part, without judicial
									intervention.
								</p>
								<p>
									<strong>13.2</strong> If a Force Majeure arises, Canna will promptly
									notify the Opposite Party thereof in writing and keep the Opposite
									Party informed of the situation including the likely duration of the
									delay or non-performance. Provided that Canna uses reasonable effort to
									limit the effect of such Force Majeure Event, such delay or failure
									will not constitute a breach of the Contract and the time of
									performance of such obligations will be extended accordingly.
									Notwithstanding this, to the extent performance is not resumed within
									30 days after the initial notice, Canna will subsequently be intiteled,
									in its sole discretion, to declare the Contreact terminated in whole or
									in part with 14 days notice.
								</p>
								<p>
									<strong>13.3</strong> "Force Majeure Event" includes (without
									limitation) any circumstances beyond the control of Canna as a result
									of which Canna is reasonably unable to perform its obligations under
									the Contract. Force Majeure Events will include (without limitation)
									government regulations or measures, quota measures, changes to
									international organisations, strikes, (civil) war, acts of war, threat
									of war, riots, occupation, pandemics or epidemics (declared or not),
									weather disturbances or business interruptions through no fault of
									Canna caused by fire, water damage, flooding, sit-in strikes,
									lock-outs, labour disturbances, defective machinery or equipment,
									disruptions or shortages in supply (i. a. of energy, products or parts)
									storage and transport difficulties, and suppliers being in default of
									supplying the goods required for the delivery of Canna's products.
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">Article 14: Termination</h2>
							<div className="definitions-list">
								<p>
									<strong>14.1</strong> Canna is entitled to suspend Performance of its
									obligations under the Contract immediately and without notice of
									default or judicial intervention, to the extent the Contract has not
									yet been executed by both Parties.
								</p>
								<p>
									<strong>14.2</strong> Without prejudice to any other rights or remedies
									to which a Party may be entitled under these General Terms and
									Conditions, a Party shall be entitled to terminate the Agreement with
									immediate effect on written notice to the Opposite Party without
									liability in the event that: (I) the Opposite Party has a winding up
									petition presented, enters into liquidation (otherwise than for the
									purposes of amalgamation or reconstruction and whether compulsorily or
									voluntarily), ceases to trade, makes an arrangement with its creditors,
									petitions for an administration order, has a receiver or manager
									appointed over any of its assets or generally becomes unable to pay its
									debts; (II) the Opposite Party is in material breach of any other
									provision of the Contract and, if the breach is capable of remedy, has
									failed to remedy that breach within 30 days; or (III) where the
									Opposite Party suffers a Bankruptcy Event; (IV) where the Opposite
									Party fails to pay an invoice in accordance with the terms of the
									Contract; (V) where the Opposite Party has a change of control of the
									Opposite Party; (VI) when it has become apparent that the Opposite
									Party is acting in violation of any applicable laws and regulations; or
									(VII) when Canna has reasonable reason to doubt the integrity of the
									Opposite Party or in Canna's reasonable opinion, the Opposite Party
									acts in a way to: (I) disparage or damage the reputation of Canna or
									its products; or (II) misuse the products.
								</p>
								<p>
									<strong>14.3</strong> In the event of termination of the Contract by
									Canna in accordance with this Article, any and all amounts owed by the
									Opposite Party will be immediately due and payable to Canna in full.
									Any products that Canna has already delivered but that have not yet
									been paid for by the Opposite Party must be returned to Canna promptly
									upon first request and at the Opposite Party's cost, without prejudice
									to Canna's right to compensation for damage, costs and interest and
									other available rights and remedies under contract or available at law.
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">Article 15: Indemnity</h2>
							<div className="definitions-list">
								<p>
									The Opposite Party agrees to indemnify, defend (at Canna´s option) and
									hold Canna and its affiliates and their directors, officers, employees,
									agents, representatives and contractors harmless against any claims
									arising from or caused by the breach of the Opposite Party´s
									obligations, including without limitation those made by and third
									parties, including (without limitation) claims by the authorities of
									any type, and against the resulting costs and losses, including any
									damage or loss related to the execution of the Contract an for all
									applicable Taxes arising from the Contract, all of which are the
									Opposite Party´s responsibility.
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">Article 16: Applicable law and jurisdiction</h2>
							<div className="definitions-list">
								<p>
									<strong>16.1</strong> Any Contract(s) between the Parties, and any
									dispute or claim arising out of or in connection with it or its subject
									matter or formation (including non-contractual disputes or claims)
									shall be governed by and construed in accordance with the law of
									Belgium, and the Opposite Party irrevocably submit to the exclusive
									jurisdiction of the Dutch courts in respect thereof.
								</p>
								<p>
									<strong>16.2</strong> Dutch law, as well as the Vienna Sales Convention
									1980 (CISG), shall apply to all negotiations, offers, the way Contracts
									are formed, as well as the contents and the resulting performance of
									these Contracts. In the event of a dispute about the interpretation of
									a translated version of these General Terms and Conditions, the English
									version shall be binding and decisive. To the extent of any conflict,
									inconsistency or other dispute over the interpretation of a translation
									of these General Terms and Conditions, the English text will prevail.
								</p>
							</div>
						</div>

						<div className="section-card">
							<h2 className="text-h2">Article 17: Miscellaneous provisions</h2>
							<div className="definitions-list">
								<p>
									<strong>17.1</strong> Each of the Parties agrees that it has the power
									and authority to enter into the Contract and has obtained all necessary
									approvals to do so.
								</p>
								<p>
									<strong>17.2</strong> If you are not a consumer, you confirm that you
									have authority to bind any business on whose behalf you use the Site to
									purchase products.
								</p>
								<p>
									<strong>17.3</strong> Failure by either Party to enforce at any time or
									for any period any one or more of the terms or conditions in a Contract
									shall not be a waiver of them or the right at any time subsequently to
									enforce all terms and conditions of the Contract.
								</p>
								<p>
									<strong>17.4</strong> Any notice to be served on either of the Parties
									by the other shall be in writing and sent by pre-paid recorded
									delivery, registered post or by email to the address of the relevant
									Party shown on at the start of the Contract or such other physical or
									electronic address as may be notified by one Party to the other.
									Notices shall be deemed to have been duly given:
								</p>
								<ul>
									<li>
										when delivered, if delivered by courier or other messenger (including
										registered mail) during normal business hours of the recipient;
									</li>
									<li>
										when sent by email, if a successful transmission report or return
										receipt is generated;
									</li>
									<li>
										on the fifth business day following mailing, if mailed by national
										ordinary mail, postage prepaid;
									</li>
									<li>
										on the tenth business day following mailing, if mailed by airmail,
										postage prepaid.
									</li>
								</ul>
								<p>
									<strong>17.5</strong> Except as otherwise expressly provided in a
									Contract, a person who is not a Party to this Agreement or a permitted
									assignee has no right to enforce any term of the Contract but this does
									not affect any right of a third party which exists, or is available.
								</p>
								<p>
									<strong>17.6</strong> We may transfer our rights and obligations under
									theses terms and conditions and the Agreement to another organization,
									but this will not affect your rights or our obligations under these
									terms and conditions.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
