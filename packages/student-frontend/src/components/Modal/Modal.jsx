import React from "react";
import Button from "../Button";

export default function Modal({ title, content, setShowModal }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-3/4 h-3/4 my-6 overflow-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
              <p className="text-l font-semibold">{title}</p>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="text-blueGray-500 leading-relaxed text-xs">
                <div className="text-lg font-semibold" dir="ltr">
                  <span>MyTime&rsquo;s Privacy Policy</span>
                </div>
                <p dir="ltr">
                  <span>Last updated: March 15, 2022</span>
                </p>
                <p dir="ltr">
                  <span>
                    This Privacy Policy describes Our policies and procedures on
                    the collection, use and disclosure of Your information when
                    You use the Service and tells You about Your privacy rights
                    and how the law protects You.
                  </span>
                </p>
                <p dir="ltr">
                  <span>
                    We use Your Personal data to provide and improve the
                    Service. By using the Service, You agree to the collection
                    and use of information in accordance with this Privacy
                    Policy. This Privacy Policy has been created with the help
                    of the{" "}
                  </span>
                  <a href="https://www.termsfeed.com/blog/sample-privacy-policy-template/">
                    <span>Privacy Policy Template</span>
                  </a>
                  <span>.</span>
                </p>
                <p className="text-lg font-semibold" dir="ltr">
                  <span>Interpretation and Definitions</span>
                </p>
                <p className="font-bold text-md" dir="ltr">
                  <span>Interpretation</span>
                </p>
                <p dir="ltr">
                  <span>
                    The words of which the initial letter is capitalized have
                    meanings defined under the following conditions. The
                    following definitions shall have the same meaning regardless
                    of whether they appear in singular or in plural.
                  </span>
                </p>
                <p className="font-bold text-md" dir="ltr">
                  <span>Definitions</span>
                </p>
                <p dir="ltr">
                  <span>For the purposes of this Privacy Policy:</span>
                </p>

                <p dir="ltr">
                  <span>Account</span>
                  <span>
                    {" "}
                    means a unique account created for You to access our Service
                    or parts of our Service.
                  </span>
                </p>

                <p dir="ltr">
                  <span>Affiliate</span>
                  <span>
                    {" "}
                    means an entity that controls, is controlled by or is under
                    common control with a party, where "control" means ownership
                    of 50% or more of the shares, equity interest or other
                    securities entitled to vote for election of directors or
                    other managing authority.
                  </span>
                </p>

                <p dir="ltr">
                  <span>Application</span>
                  <span>
                    {" "}
                    means the software program provided by the Company
                    downloaded by You on any electronic device, named MyTime
                  </span>
                </p>

                <p dir="ltr">
                  <span>Company</span>
                  <span>
                    {" "}
                    (referred to as either "the Company", "We", "Us" or "Our" in
                    this Agreement) refers to MyTime.
                  </span>
                </p>

                <p dir="ltr">
                  <span>Country</span>
                  <span> refers to: Ontario, Canada</span>
                </p>

                <p dir="ltr">
                  <span>Device</span>
                  <span>
                    {" "}
                    means any device that can access the Service such as a
                    computer, a cellphone or a digital tablet.
                  </span>
                </p>

                <p dir="ltr">
                  <span>Personal Data</span>
                  <span>
                    {" "}
                    is any information that relates to an identified or
                    identifiable individual.
                  </span>
                </p>

                <p dir="ltr">
                  <span>Service</span>
                  <span> refers to the Application.</span>
                </p>

                <p dir="ltr">
                  <span>Service Provider</span>
                  <span>
                    {" "}
                    means any natural or legal person who processes the data on
                    behalf of the Company. It refers to third-party companies or
                    individuals employed by the Company to facilitate the
                    Service, to provide the Service on behalf of the Company, to
                    perform services related to the Service or to assist the
                    Company in analyzing how the Service is used.
                  </span>
                </p>

                <p dir="ltr">
                  <span>Usage Data</span>
                  <span>
                    {" "}
                    refers to data collected automatically, either generated by
                    the use of the Service or from the Service infrastructure
                    itself (for example, the duration of a page visit).
                  </span>
                </p>

                <p dir="ltr">
                  <span>You</span>
                  <span>
                    {" "}
                    means the individual accessing or using the Service, or the
                    company, or other legal entity on behalf of which such
                    individual is accessing or using the Service, as applicable.
                  </span>
                </p>

                <p className="text-lg font-semibold" dir="ltr">
                  <span>Collecting and Using Your Personal Data</span>
                </p>
                <p className="font-bold text-md" dir="ltr">
                  <span>Types of Data Collected</span>
                </p>
                <p className="text-md font-semibold" dir="ltr">
                  <span>Personal Data</span>
                </p>
                <p dir="ltr">
                  <span>
                    While using Our Service, We may ask You to provide Us with
                    certain personally identifiable information that can be used
                    to contact or identify You. Personally identifiable
                    information may include, but is not limited to:
                  </span>
                </p>

                <p dir="ltr">
                  <span>Email address</span>
                </p>

                <p dir="ltr">
                  <span>First name and last name</span>
                </p>

                <p dir="ltr">
                  <span>Phone number</span>
                </p>

                <p dir="ltr">
                  <span>Address, State, Province, ZIP/Postal code, City</span>
                </p>

                <p dir="ltr">
                  <span>Usage Data</span>
                </p>

                <p className="text-md font-semibold" dir="ltr">
                  <span>Usage Data</span>
                </p>
                <p dir="ltr">
                  <span>
                    Usage Data is collected automatically when using the
                    Service.
                  </span>
                </p>
                <p dir="ltr">
                  <span>
                    Usage Data may include information such as Your Device's
                    Internet Protocol address (e.g. IP address), browser type,
                    browser version, the pages of our Service that You visit,
                    the time and date of Your visit, the time spent on those
                    pages, unique device identifiers and other diagnostic data.
                  </span>
                </p>
                <p dir="ltr">
                  <span>
                    When You access the Service by or through a mobile device,
                    We may collect certain information automatically, including,
                    but not limited to, the type of mobile device You use, Your
                    mobile device unique ID, the IP address of Your mobile
                    device, Your mobile operating system, the type of mobile
                    Internet browser You use, unique device identifiers and
                    other diagnostic data.
                  </span>
                </p>
                <p dir="ltr">
                  <span>
                    We may also collect information that Your browser sends
                    whenever You visit our Service or when You access the
                    Service by or through a mobile device.
                  </span>
                </p>
                <p className="text-md font-semibold" dir="ltr">
                  <span>Information Collected while Using the Application</span>
                </p>
                <p dir="ltr">
                  <span>
                    While using Our Application, in order to provide features of
                    Our Application, We may collect, with Your prior permission:
                  </span>
                </p>

                <p dir="ltr">
                  <span>Information regarding your location</span>
                </p>

                <p dir="ltr">
                  <span>
                    We use this information to provide features of Our Service,
                    to improve and customize Our Service. The information may be
                    uploaded to the Company's servers and/or a Service
                    Provider's server or it may be simply stored on Your device.
                  </span>
                </p>
                <p dir="ltr">
                  <span>
                    You can enable or disable access to this information at any
                    time, through Your Device settings.
                  </span>
                </p>
                <p className="font-bold text-md" dir="ltr">
                  <span>Use of Your Personal Data</span>
                </p>
                <p dir="ltr">
                  <span>
                    The Company may use Personal Data for the following
                    purposes:
                  </span>
                </p>

                <p dir="ltr">
                  <span>To provide and maintain our Service</span>
                  <span>, including to monitor the usage of our Service.</span>
                </p>

                <p dir="ltr">
                  <span>To manage Your Account:</span>
                  <span>
                    {" "}
                    to manage Your registration as a user of the Service. The
                    Personal Data You provide can give You access to different
                    functionalities of the Service that are available to You as
                    a registered user.
                  </span>
                </p>

                <p dir="ltr">
                  <span>For the performance of a contract:</span>
                  <span>
                    {" "}
                    the development, compliance and undertaking of the purchase
                    contract for the products, items or services You have
                    purchased or of any other contract with Us through the
                    Service.
                  </span>
                </p>

                <p dir="ltr">
                  <span>To contact You:</span>
                  <span>
                    {" "}
                    To contact You by email, telephone calls, SMS, or other
                    equivalent forms of electronic communication, such as a
                    mobile application's push notifications regarding updates or
                    informative communications related to the functionalities,
                    products or contracted services, including the security
                    updates, when necessary or reasonable for their
                    implementation.
                  </span>
                </p>

                <p dir="ltr">
                  <span>To provide You</span>
                  <span>
                    {" "}
                    with news, special offers and general information about
                    other goods, services and events which we offer that are
                    similar to those that you have already purchased or enquired
                    about unless You have opted not to receive such information.
                  </span>
                </p>

                <p dir="ltr">
                  <span>To manage Your requests:</span>
                  <span> To attend and manage Your requests to Us.</span>
                </p>

                <p dir="ltr">
                  <span>For business transfers:</span>
                  <span>
                    {" "}
                    We may use Your information to evaluate or conduct a merger,
                    divestiture, restructuring, reorganization, dissolution, or
                    other sale or transfer of some or all of Our assets, whether
                    as a going concern or as part of bankruptcy, liquidation, or
                    similar proceeding, in which Personal Data held by Us about
                    our Service users is among the assets transferred.
                  </span>
                </p>

                <p dir="ltr">
                  <span>For other purposes</span>
                  <span>
                    : We may use Your information for other purposes, such as
                    data analysis, identifying usage trends, determining the
                    effectiveness of our promotional campaigns and to evaluate
                    and improve our Service, products, services, marketing and
                    your experience.
                  </span>
                </p>

                <p dir="ltr">
                  <span>
                    We may share Your personal information in the following
                    situations:
                  </span>
                </p>

                <p dir="ltr">
                  <span>With Service Providers:</span>
                  <span>
                    {" "}
                    We may share Your personal information with Service
                    Providers to monitor and analyze the use of our Service, to
                    contact You.
                  </span>
                </p>

                <p dir="ltr">
                  <span>For business transfers:</span>
                  <span>
                    {" "}
                    We may share or transfer Your personal information in
                    connection with, or during negotiations of, any merger, sale
                    of Company assets, financing, or acquisition of all or a
                    portion of Our business to another company.
                  </span>
                </p>

                <p dir="ltr">
                  <span>With Affiliates:</span>
                  <span>
                    {" "}
                    We may share Your information with Our affiliates, in which
                    case we will require those affiliates to honor this Privacy
                    Policy. Affiliates include Our parent company and any other
                    subsidiaries, joint venture partners or other companies that
                    We control or that are under common control with Us.
                  </span>
                </p>

                <p dir="ltr">
                  <span>With business partners:</span>
                  <span>
                    {" "}
                    We may share Your information with Our business partners to
                    offer You certain products, services or promotions.
                  </span>
                </p>

                <p dir="ltr">
                  <span>With other users:</span>
                  <span>
                    {" "}
                    when You share personal information or otherwise interact in
                    the public areas with other users, such information may be
                    viewed by all users and may be publicly distributed outside.
                  </span>
                </p>

                <p dir="ltr">
                  <span>With Your consent</span>
                  <span>
                    : We may disclose Your personal information for any other
                    purpose with Your consent.
                  </span>
                </p>

                <p className="font-bold text-md" dir="ltr">
                  <span>Retention of Your Personal Data</span>
                </p>
                <p dir="ltr">
                  <span>
                    The Company will retain Your Personal Data only for as long
                    as is necessary for the purposes set out in this Privacy
                    Policy. We will retain and use Your Personal Data to the
                    extent necessary to comply with our legal obligations (for
                    example, if we are required to retain your data to comply
                    with applicable laws), resolve disputes, and enforce our
                    legal agreements and policies.
                  </span>
                </p>
                <p dir="ltr">
                  <span>
                    The Company will also retain Usage Data for internal
                    analysis purposes. Usage Data is generally retained for a
                    shorter period of time, except when this data is used to
                    strengthen the security or to improve the functionality of
                    Our Service, or We are legally obligated to retain this data
                    for longer time periods.
                  </span>
                </p>
                <p className="font-bold text-md" dir="ltr">
                  <span>Transfer of Your Personal Data</span>
                </p>
                <p dir="ltr">
                  <span>
                    Your information, including Personal Data, is processed at
                    the Company's operating offices and in any other places
                    where the parties involved in the processing are located. It
                    means that this information may be transferred to &mdash;
                    and maintained on &mdash; computers located outside of Your
                    state, province, country or other governmental jurisdiction
                    where the data protection laws may differ than those from
                    Your jurisdiction.
                  </span>
                </p>
                <p dir="ltr">
                  <span>
                    Your consent to this Privacy Policy followed by Your
                    submission of such information represents Your agreement to
                    that transfer.
                  </span>
                </p>
                <p dir="ltr">
                  <span>
                    The Company will take all steps reasonably necessary to
                    ensure that Your data is treated securely and in accordance
                    with this Privacy Policy and no transfer of Your Personal
                    Data will take place to an organization or a country unless
                    there are adequate controls in place including the security
                    of Your data and other personal information.
                  </span>
                </p>
                <p className="font-bold text-md" dir="ltr">
                  <span>Disclosure of Your Personal Data</span>
                </p>
                <p className="text-md font-semibold" dir="ltr">
                  <span>Business Transactions</span>
                </p>
                <p dir="ltr">
                  <span>
                    If the Company is involved in a merger, acquisition or asset
                    sale, Your Personal Data may be transferred. We will provide
                    notice before Your Personal Data is transferred and becomes
                    subject to a different Privacy Policy.
                  </span>
                </p>
                <p className="text-md font-semibold" dir="ltr">
                  <span>Law enforcement</span>
                </p>
                <p dir="ltr">
                  <span>
                    Under certain circumstances, the Company may be required to
                    disclose Your Personal Data if required to do so by law or
                    in response to valid requests by public authorities (e.g. a
                    court or a government agency).
                  </span>
                </p>
                <p className="text-md font-semibold" dir="ltr">
                  <span>Other legal requirements</span>
                </p>
                <p dir="ltr">
                  <span>
                    The Company may disclose Your Personal Data in the good
                    faith belief that such action is necessary to:
                  </span>
                </p>

                <p dir="ltr">
                  <span>Comply with a legal obligation</span>
                </p>

                <p dir="ltr">
                  <span>
                    Protect and defend the rights or property of the Company
                  </span>
                </p>

                <p dir="ltr">
                  <span>
                    Prevent or investigate possible wrongdoing in connection
                    with the Service
                  </span>
                </p>

                <p dir="ltr">
                  <span>
                    Protect the personal safety of Users of the Service or the
                    public
                  </span>
                </p>

                <p dir="ltr">
                  <span>Protect against legal liability</span>
                </p>

                <p className="font-bold text-md" dir="ltr">
                  <span>Security of Your Personal Data</span>
                </p>
                <p dir="ltr">
                  <span>
                    The security of Your Personal Data is important to Us, but
                    remember that no method of transmission over the Internet,
                    or method of electronic storage is 100% secure. While We
                    strive to use commercially acceptable means to protect Your
                    Personal Data, We cannot guarantee its absolute security.
                  </span>
                </p>
                <p className="text-lg font-semibold" dir="ltr">
                  <span>Children's Privacy</span>
                </p>
                <p dir="ltr">
                  <span>
                    Our Service does not address anyone under the age of 13. We
                    do not knowingly collect personally identifiable information
                    from anyone under the age of 13. If You are a parent or
                    guardian and You are aware that Your child has provided Us
                    with Personal Data, please contact Us. If We become aware
                    that We have collected Personal Data from anyone under the
                    age of 13 without verification of parental consent, We take
                    steps to remove that information from Our servers.
                  </span>
                </p>
                <p dir="ltr">
                  <span>
                    If We need to rely on consent as a legal basis for
                    processing Your information and Your country requires
                    consent from a parent, We may require Your parent's consent
                    before We collect and use that information.
                  </span>
                </p>
                <p className="text-lg font-semibold" dir="ltr">
                  <span>Links to Other Websites</span>
                </p>
                <p dir="ltr">
                  <span>
                    Our Service may contain links to other websites that are not
                    operated by Us. If You click on a third party link, You will
                    be directed to that third party's site. We strongly advise
                    You to review the Privacy Policy of every site You visit.
                  </span>
                </p>
                <p dir="ltr">
                  <span>
                    We have no control over and assume no responsibility for the
                    content, privacy policies or practices of any third party
                    sites or services.
                  </span>
                </p>
                <p className="text-lg font-semibold" dir="ltr">
                  <span>Changes to this Privacy Policy</span>
                </p>
                <p dir="ltr">
                  <span>
                    We may update Our Privacy Policy from time to time. We will
                    notify You of any changes by posting the new Privacy Policy
                    on this page.
                  </span>
                </p>
                <p dir="ltr">
                  <span>
                    We will let You know via email and/or a prominent notice on
                    Our Service, prior to the change becoming effective and
                    update the "Last updated" date at the top of this Privacy
                    Policy.
                  </span>
                </p>
                <p dir="ltr">
                  <span>
                    You are advised to review this Privacy Policy periodically
                    for any changes. Changes to this Privacy Policy are
                    effective when they are posted on this page.
                  </span>
                </p>
                <p className="text-lg font-semibold" dir="ltr">
                  <span>Contact Us</span>
                </p>
                <p dir="ltr">
                  <span>
                    If you have any questions about this Privacy Policy, You can
                    contact us:
                  </span>
                </p>

                <p dir="ltr">
                  <span>By email: mytime@gmail.com</span>
                </p>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
              <Button
                type="button"
                label="Close"
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
