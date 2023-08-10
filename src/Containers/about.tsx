import React, {Fragment} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

function About() {
  const handleSubmit=(value: any)=>{
    return;
  };
  const recaptchaRef = React.createRef<ReCAPTCHA>();
  return (
    <Fragment>
      <div className="" style={{paddingTop: '5%', paddingLeft: '8%'}}></div>
      <div className="container">
        <div className="row">
          <div>
            <a href='https://github.com/PacodiazDG'>See the project repository for more information.</a>
          </div>
          <div style={{visibility: 'hidden'}}>
            <form onSubmit={handleSubmit} >
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LeWyGQUAAAAAPS57QwiTeP_eO-sSTK7ic1tIQBN"
                onChange={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default About;
