"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordEmailTemplate = exports.verificationEmailTemplate = void 0;
const verificationEmailTemplate = (verifyCode, email) => {
    const mailOptions = {
        from: 'Bizdan :)',
        to: email,
        subject: 'Email Verification',
        html: `
        <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Tamplate</title>
        <style>
            body {
          width: 100% !important;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          margin: 0;
          padding: 0;
          line-height: 100%;
        }
        [style*="Open Sans"] {font-family: 'Open Sans', arial, sans-serif !important;}
        img {
          outline: none;
          text-decoration: none;
          border:none;
          -ms-interpolation-mode: bicubic;
          max-width: 100%!important;
          margin: 0;
          padding: 0;
          display: block;
        }
        table td {
          border-collapse: collapse;
        }
        table {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
            .logo {
                margin: 0 auto;   
            }
            .title {
                margin: 0 auto;   
            }
            .hello {
                font-size: 35px;
                text-align: center;
                color: #ffffff;
                font-family: Arial, Helvetica, sans-serif;
            }
            .sub_title {
                font-size: 25px;
                color: #ffffff;
                font-family: Arial, Helvetica, sans-serif;
                text-align: center;
            }
            .indent {
                height: 25px;
            }
            .big_indent {
                height: 100px;
            }
            img {
              width: 200px;
              height: 200px;
            }
            a {
                text-decoration: none;
            }
            button {
                width: 740px;
                margin-left: 30px;
                border: none;
                border-radius: 10px;
                width: 720px;
                height: 88px;
                background: linear-gradient(90deg, rgba(255, 245, 0, 0.49) 0%, #FFF500 21.35%, #FFF500 78.65%, rgba(255, 245, 0, 0.32) 100%);
            }
            .btn {
                font-size: 31px;
                line-height: 38px;
                color: black;
            }
            .worning {
                width: 415px;
                height: 48px;
                font-weight: normal;
                font-size: 15px;
                line-height: 24px;
                color: #ffffff;
                font-family: Arial, Helvetica, sans-serif;
                margin-left: 30px;
            }
            .link {
                font-style: italic;
                color: #ffffff;
                text-decoration: underline;
                font-weight: bold;
            }
            .company_sub_title {
                font-size: 28px;
                text-align: left;
                margin-left: 30px;
                font-family: Arial, Helvetica, sans-serif;
                color: #fff;
            }
            span {
                color: #FFF500;
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0;">
      <div style="font-size:0px;font-color:#ffffff;opacity:0;visibility:hidden;width:0;height:0;display:none;">Тестовое письмо</div>
      <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#ededed">
        <tr>
                <td>
                    <table class="logo" cellpadding="0" cellspacing="0" width="840px" bgcolor="black">
                        <tr class="indent">
                            <td>
                            
                            </td>
                        </tr>
                        <tr class="indent">
                            <td>                            
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table class="title" cellpadding="0" cellspacing="0" width="800px">
                                    <tr>
                                    <td>
                                            <p class="hello">Salom "User"!</p>
                                            <p class="sub_title">Itimos shu tugmani bosing va 
                                                tekshirishdan o’ting</p>
                                        </td>
                                    </tr>
                                    <tr class="indent">
                                        <td>
                                        
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button><a class="btn" href="http://localhost:3000/auth/verify/${verifyCode}">E-mailni tasdiqlash</a></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="worning">*Agar email tekshirishdan o’tishga so’rov qilmagan bo’lsangiz 
                                                iltimos bu xabarni o’chirib tashlang</p>
                                        </td>
                                    </tr>
                                    <tr class="indent">
                                        <td>                                        
                                        </td>
                                    </tr>
                                    <tr class="indent">
                                        <td>                                        
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="sub_title">Yanada ko'proq ma'lumot uchun - <a class="link" href="#">Yordam markazi</a></p>
                                        </td>
                                    </tr>
                                    <tr class="big_indent">
                                        <td>                                        
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="company_sub_title">Hurmat ila!</p>
                                            <p class="company_sub_title"><span class="com">Muslim Engineers Community!)</span></p>
                                        </td>
                                    </tr>
                                    <tr class="indent">
                                        <td>
                                        
                                        </td>
                                    </tr>
                                    <tr class="indent">
                                        <td>                                        
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
      </table>
    </body>
    `,
    };
    return mailOptions;
};
exports.verificationEmailTemplate = verificationEmailTemplate;
const forgotPasswordEmailTemplate = (verifyCode, email) => {
    const mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: 'Forgot Password',
        html: `
      <h2>Please, click the button below to confirm your email</h2>
      <p>That was easy!</p>
      <button><a href="http://localhost:3000/auth/activate/${verifyCode}">Click to confirm</a></button>
    `,
    };
    return mailOptions;
};
exports.forgotPasswordEmailTemplate = forgotPasswordEmailTemplate;
