exports.emailVerification = (code) =>
	`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dein Bestätigungscode für Groupera</title>
    <style type="text/css" emogrify="no">
      #outlook a {
        padding: 0;
      }
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }
      table td {
        border-collapse: collapse;
        mso-line-height-rule: exactly;
      }
      .editable.image {
        font-size: 0 !important;
        line-height: 0 !important;
      }
      .nl2go_preheader {
        display: none !important;
        mso-hide: all !important;
        mso-line-height-rule: exactly;
        visibility: hidden !important;
        line-height: 0px !important;
        font-size: 0px !important;
      }
      body {
        width: 100% !important;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        margin: 0;
        padding: 0;
      }
      img {
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
      a img {
        border: none;
      }
      table {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      th {
        font-weight: normal;
        text-align: left;
      }
      *[class="gmail-fix"] {
        display: none !important;
      }
    </style>
    <style type="text/css" emogrify="no">
      @media (max-width: 600px) {
        .gmx-killpill {
          content: " ` +
  '\03D1' +
  `";
        }
      }
    </style>
    <style type="text/css" emogrify="no">
      @media (max-width: 600px) {
        .gmx-killpill {
          content: " ` +
  '\03D1' +
  `";
        }
        .r0-o {
          border-style: solid !important;
          margin: 0 auto 0 auto !important;
          width: 320px !important;
        }
        .r1-i {
          background-color: #ffffff !important;
        }
        .r2-c {
          box-sizing: border-box !important;
          text-align: center !important;
          valign: top !important;
          width: 100% !important;
        }
        .r3-o {
          border-style: solid !important;
          margin: 0 auto 0 auto !important;
          width: 100% !important;
        }
        .r4-c {
          box-sizing: border-box !important;
          display: block !important;
          valign: top !important;
          width: 100% !important;
        }
        .r5-o {
          border-style: solid !important;
          width: 100% !important;
        }
        .r6-i {
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .r7-o {
          border-style: solid !important;
          margin: 0 auto 0 auto !important;
          width: 50% !important;
        }
        .r8-i {
          padding-bottom: 15px !important;
          padding-top: 15px !important;
        }
        .r9-c {
          box-sizing: border-box !important;
          text-align: left !important;
          valign: top !important;
          width: 100% !important;
        }
        .r10-o {
          border-style: solid !important;
          margin: 0 auto 0 0 !important;
          width: 100% !important;
        }
        .r11-i {
          padding-bottom: 0px !important;
          padding-top: 25px !important;
          text-align: center !important;
        }
        .r12-i {
          padding-bottom: 20px !important;
          padding-left: 15px !important;
          padding-right: 15px !important;
          padding-top: 20px !important;
        }
        .r13-i {
          padding-bottom: 15px !important;
          padding-top: 10px !important;
          text-align: center !important;
        }
        .r14-i {
          padding-top: 15px !important;
          text-align: center !important;
        }
        .r15-i {
          padding-bottom: 15px !important;
          padding-top: 15px !important;
          text-align: center !important;
        }
        .r16-c {
          box-sizing: border-box !important;
          text-align: center !important;
          width: 100% !important;
        }
        .r17-c {
          box-sizing: border-box !important;
          width: 100% !important;
        }
        .r18-i {
          font-size: 0px !important;
          padding-bottom: 15px !important;
          padding-left: 105px !important;
          padding-right: 105px !important;
          padding-top: 15px !important;
        }
        .r19-c {
          box-sizing: border-box !important;
          width: 32px !important;
        }
        .r20-o {
          border-style: solid !important;
          margin-right: 8px !important;
          width: 32px !important;
        }
        .r21-i {
          padding-bottom: 5px !important;
          padding-top: 5px !important;
        }
        .r22-o {
          border-style: solid !important;
          margin-right: 0px !important;
          width: 32px !important;
        }
        .r23-i {
          background-color: #eff2f7 !important;
        }
        .r24-c {
          box-sizing: border-box !important;
          text-align: center !important;
          valign: top !important;
          width: 320px !important;
        }
        .r25-i {
          color: #3b3f44 !important;
          padding-bottom: 0px !important;
          padding-top: 15px !important;
          text-align: center !important;
        }
        .r26-i {
          color: #3b3f44 !important;
          padding-bottom: 0px !important;
          padding-top: 0px !important;
          text-align: center !important;
        }
        .r27-i {
          color: #3b3f44 !important;
          padding-bottom: 15px !important;
          padding-top: 15px !important;
          text-align: center !important;
        }
        .r28-i {
          padding-bottom: 15px !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
          padding-top: 0px !important;
        }
        .r29-c {
          box-sizing: border-box !important;
          text-align: center !important;
          valign: top !important;
          width: 129px !important;
        }
        .r30-o {
          border-style: solid !important;
          margin: 0 auto 0 auto !important;
          width: 129px !important;
        }
        body {
          -webkit-text-size-adjust: none;
        }
        .nl2go-responsive-hide {
          display: none;
        }
        .nl2go-body-table {
          min-width: unset !important;
        }
        .mobshow {
          height: auto !important;
          overflow: visible !important;
          max-height: unset !important;
          visibility: visible !important;
          border: none !important;
        }
        .resp-table {
          display: inline-table !important;
        }
        .magic-resp {
          display: table-cell !important;
        }
      }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css" emogrify="no">
      @import url("https://fonts.googleapis.com/css2?family=Roboto");
      @import url("https://fonts.googleapis.com/css2?family=S");
    </style>
    <!--<![endif]-->
    <style type="text/css">
      p,
      h1,
      h2,
      h3,
      h4,
      ol,
      ul {
        margin: 0;
      }
      a,
      a:link {
        color: #0092ff;
        text-decoration: underline;
      }
      .nl2go-default-textstyle {
        color: #3b3f44;
        font-family: arial, helvetica, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        word-break: break-word;
      }
      .default-button {
        color: #ffffff;
        font-family: arial, helvetica, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: normal;
        line-height: 1.15;
        text-decoration: none;
        word-break: break-word;
      }
      .default-heading1 {
        color: #1f2d3d;
        font-family: arial, helvetica, sans-serif;
        font-size: 36px;
        word-break: break-word;
      }
      .default-heading2 {
        color: #1f2d3d;
        font-family: arial, helvetica, sans-serif;
        font-size: 32px;
        word-break: break-word;
      }
      .default-heading3 {
        color: #1f2d3d;
        font-family: arial, helvetica, sans-serif;
        font-size: 24px;
        word-break: break-word;
      }
      .default-heading4 {
        color: #1f2d3d;
        font-family: arial, helvetica, sans-serif;
        font-size: 18px;
        word-break: break-word;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .no-show-for-you {
        border: none;
        display: none;
        float: none;
        font-size: 0;
        height: 0;
        line-height: 0;
        max-height: 0;
        mso-hide: all;
        overflow: hidden;
        table-layout: fixed;
        visibility: hidden;
        width: 0;
      }
    </style>
    <!--[if mso
      ]><xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG /> <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml><!
    [endif]-->
    <style type="text/css">
      a:link {
        color: #0092ff;
        text-decoration: underline;
      }
    </style>
  </head>
  <body
    bgcolor="#ffffff"
    text="#3b3f44"
    link="#0092ff"
    yahoo="fix"
    style="background-color: #ffffff"
  >
    <table
      cellspacing="0"
      cellpadding="0"
      border="0"
      role="presentation"
      class="nl2go-body-table"
      width="100%"
      style="background-color: #ffffff; width: 100%"
    >
      <tr>
        <td>
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            role="presentation"
            width="600"
            align="center"
            class="r0-o"
            style="table-layout: fixed; width: 600px"
          >
            <tr>
              <td valign="top" class="r1-i" style="background-color: #ffffff">
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%"
                >
                  <tr>
                    <td>
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            class="r4-c"
                            style="font-weight: normal"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r5-o"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td valign="top" class="r6-i">
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="r2-c" align="center">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="180"
                                          class="r7-o"
                                          style="
                                            table-layout: fixed;
                                            width: 180px;
                                          "
                                        >
                                          <tr>
                                            <td
                                              class="r8-i"
                                              style="
                                                font-size: 0px;
                                                line-height: 0px;
                                                padding-bottom: 15px;
                                                padding-top: 15px;
                                              "
                                            >
                                              <img
                                                src="https://img.mailinblue.com/6640989/images/content_library/original/652d3509e4187a5c7f7a89c3.jpg"
                                                width="180"
                                                border="0"
                                                style="
                                                  display: block;
                                                  width: 100%;
                                                "
                                              />
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="r9-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r10-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class="r11-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                font-size: 16px;
                                                line-height: 1.5;
                                                word-break: break-word;
                                                padding-top: 25px;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <h2
                                                  class="default-heading2"
                                                  style="
                                                    margin: 0;
                                                    color: #1f2d3d;
                                                    font-family: arial,
                                                      helvetica, sans-serif;
                                                    font-size: 32px;
                                                    word-break: break-word;
                                                  "
                                                >
                                                  <span style="display: inline"
                                                    ><span
                                                      style="
                                                        color: #000000;
                                                        font-family: Roboto;
                                                        font-size: 26px;
                                                      "
                                                      >Danke, dass du dich bei
                                                      Groupera angemeldet
                                                      hast!</span
                                                    ></span
                                                  >
                                                </h2>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%"
                >
                  <tr>
                    <td
                      class="r12-i"
                      style="padding-bottom: 20px; padding-top: 20px"
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            class="r4-c"
                            style="font-weight: normal"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r5-o"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td
                                  valign="top"
                                  class="r6-i"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="r9-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r10-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class="r13-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                font-size: 16px;
                                                line-height: 1.5;
                                                word-break: break-word;
                                                padding-bottom: 15px;
                                                padding-top: 10px;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <p style="margin: 0">
                                                  <span style="display: inline"
                                                    ><span
                                                      style="
                                                        color: #000000;
                                                        font-family: Roboto;
                                                        font-size: 18px;
                                                      "
                                                      >Verwende bitte den
                                                      Bestätigungscode unten, um
                                                      deine E-Mail-Adresse zu
                                                      bestätigen und die
                                                      Registrierung deines
                                                      Kontos bei Groupera
                                                      abzuschließen</span
                                                    ></span
                                                  >
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%"
                >
                  <tr>
                    <td
                      class="r12-i"
                      style="padding-bottom: 20px; padding-top: 20px"
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            class="r4-c"
                            style="font-weight: normal"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r5-o"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td
                                  valign="top"
                                  class="r6-i"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="r9-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r10-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class="r14-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                font-size: 16px;
                                                line-height: 1.5;
                                                word-break: break-word;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <h2
                                                  class="default-heading2"
                                                  style="
                                                    margin: 0;
                                                    color: #1f2d3d;
                                                    font-family: arial,
                                                      helvetica, sans-serif;
                                                    font-size: 32px;
                                                    word-break: break-word;
                                                  "
                                                >
                                                  <span style="font-size: 48px"
                                                    >${code}
                                                  </span>
                                                </h2>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%"
                >
                  <tr>
                    <td
                      class="r12-i"
                      style="padding-bottom: 20px; padding-top: 20px"
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            class="r4-c"
                            style="font-weight: normal"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r5-o"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td
                                  valign="top"
                                  class="r6-i"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="r2-c" align="center">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="570"
                                          class="r3-o"
                                          style="
                                            border-collapse: separate;
                                            border-radius: 15px;
                                            table-layout: fixed;
                                            width: 570px;
                                          "
                                        >
                                          <tr>
                                            <td
                                              class="r8-i"
                                              style="
                                                border-radius: 15px;
                                                font-size: 0px;
                                                line-height: 0px;
                                                padding-bottom: 15px;
                                                padding-top: 15px;
                                              "
                                            >
                                              <img
                                                src="https://img.mailinblue.com/6640989/images/content_library/original/653642582ad53419664c5aee.jpg"
                                                width="570"
                                                border="0"
                                                style="
                                                  display: block;
                                                  width: 100%;
                                                  border-radius: 15px;
                                                "
                                              />
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%"
                >
                  <tr>
                    <td
                      class="r12-i"
                      style="padding-bottom: 20px; padding-top: 20px"
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            class="r4-c"
                            style="font-weight: normal"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r5-o"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td
                                  valign="top"
                                  class="r6-i"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="r9-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r10-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class="r14-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                font-size: 16px;
                                                line-height: 1.5;
                                                word-break: break-word;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <h2
                                                  class="default-heading2"
                                                  style="
                                                    margin: 0;
                                                    color: #1f2d3d;
                                                    font-family: arial,
                                                      helvetica, sans-serif;
                                                    font-size: 32px;
                                                    word-break: break-word;
                                                  "
                                                >
                                                  <span
                                                    style="
                                                      color: #a64d79;
                                                      font-family: Roboto;
                                                      font-size: 26px;
                                                    "
                                                    >Unsere Vision</span
                                                  >
                                                </h2>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="r9-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r10-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class="r15-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                font-size: 16px;
                                                line-height: 1.5;
                                                word-break: break-word;
                                                padding-bottom: 15px;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <p style="margin: 0">
                                                  <span
                                                    style="
                                                      color: #000000;
                                                      font-family: Roboto;
                                                      font-size: 18px;
                                                    "
                                                    >Wir wollen mit Groupera
                                                    Deutschlands digitale
                                                    Selbsthilfe Plattform
                                                    schaffen, die jedem den
                                                    Zugang zu der richtigen
                                                    Selbsthilfegruppe
                                                    ermöglicht.</span
                                                  >
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%"
                >
                  <tr>
                    <td
                      class="r12-i"
                      style="padding-bottom: 20px; padding-top: 20px"
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            class="r4-c"
                            style="font-weight: normal"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r5-o"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td
                                  valign="top"
                                  class="r6-i"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="r9-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r10-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class="r14-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                font-size: 16px;
                                                line-height: 1.5;
                                                word-break: break-word;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <h2
                                                  class="default-heading2"
                                                  style="
                                                    margin: 0;
                                                    color: #1f2d3d;
                                                    font-family: arial,
                                                      helvetica, sans-serif;
                                                    font-size: 32px;
                                                    word-break: break-word;
                                                  "
                                                >
                                                  <span
                                                    style="
                                                      color: #000000;
                                                      font-family: Roboto;
                                                      font-size: 26px;
                                                    "
                                                    ><strong
                                                      >Folgt uns auf</strong
                                                    ></span
                                                  >
                                                </h2>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="r16-c" align="center">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="570"
                                          align="center"
                                          class="r3-o"
                                          style="
                                            table-layout: fixed;
                                            width: 570px;
                                          "
                                        >
                                          <tr>
                                            <td valign="top">
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                role="presentation"
                                              >
                                                <tr>
                                                  <td
                                                    class="r17-c"
                                                    style="
                                                      display: inline-block;
                                                    "
                                                  >
                                                    <table
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                      border="0"
                                                      role="presentation"
                                                      width="570"
                                                      class="r5-o"
                                                      style="
                                                        table-layout: fixed;
                                                        width: 570px;
                                                      "
                                                    >
                                                      <tr>
                                                        <td
                                                          class="r18-i"
                                                          style="
                                                            padding-bottom: 15px;
                                                            padding-left: 249px;
                                                            padding-right: 249px;
                                                            padding-top: 15px;
                                                          "
                                                        >
                                                          <table
                                                            width="100%"
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                          >
                                                            <tr>
                                                              <th
                                                                width="40"
                                                                class="r19-c mobshow resp-table"
                                                                style="
                                                                  font-weight: normal;
                                                                "
                                                              >
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="100%"
                                                                  class="r20-o"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 100%;
                                                                  "
                                                                >
                                                                  <tr>
                                                                    <td
                                                                      class="r21-i"
                                                                      style="
                                                                        font-size: 0px;
                                                                        line-height: 0px;
                                                                        padding-bottom: 5px;
                                                                        padding-top: 5px;
                                                                      "
                                                                    >
                                                                      <a
                                                                        href="https://www.facebook.com/61552096289948"
                                                                        target="_blank"
                                                                        style="
                                                                          color: #0092ff;
                                                                          text-decoration: underline;
                                                                        "
                                                                      >
                                                                        <img
                                                                          src="https://creative-assets.mailinblue.com/editor/social-icons/rounded_colored/facebook_32px.png"
                                                                          width="32"
                                                                          border="0"
                                                                          style="
                                                                            display: block;
                                                                            width: 100%;
                                                                          "
                                                                      /></a>
                                                                    </td>
                                                                    <td
                                                                      class="nl2go-responsive-hide"
                                                                      width="8"
                                                                      style="
                                                                        font-size: 0px;
                                                                        line-height: 1px;
                                                                      "
                                                                    >
                                                                      ­
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </th>
                                                              <th
                                                                width="32"
                                                                class="r19-c mobshow resp-table"
                                                                style="
                                                                  font-weight: normal;
                                                                "
                                                              >
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="100%"
                                                                  class="r22-o"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 100%;
                                                                  "
                                                                >
                                                                  <tr>
                                                                    <td
                                                                      class="r21-i"
                                                                      style="
                                                                        font-size: 0px;
                                                                        line-height: 0px;
                                                                        padding-bottom: 5px;
                                                                        padding-top: 5px;
                                                                      "
                                                                    >
                                                                      <a
                                                                        href="https://instagram.com/groupera.de?igshid=MzRlODBiNWFlZA=="
                                                                        target="_blank"
                                                                        style="
                                                                          color: #0092ff;
                                                                          text-decoration: underline;
                                                                        "
                                                                      >
                                                                        <img
                                                                          src="https://creative-assets.mailinblue.com/editor/social-icons/rounded_colored/instagram_32px.png"
                                                                          width="32"
                                                                          border="0"
                                                                          style="
                                                                            display: block;
                                                                            width: 100%;
                                                                          "
                                                                      /></a>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </th>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            role="presentation"
            width="100%"
            align="center"
            class="r3-o"
            style="table-layout: fixed; width: 100%"
          >
            <tr>
              <td valign="top" class="r23-i" style="background-color: #eff2f7">
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="600"
                  align="center"
                  class="r0-o"
                  style="table-layout: fixed; width: 600px"
                >
                  <tr>
                    <td
                      class="r12-i"
                      style="padding-bottom: 20px; padding-top: 20px"
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            class="r4-c"
                            style="font-weight: normal"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r5-o"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td
                                  valign="top"
                                  class="r6-i"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="r9-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r10-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class="r25-i nl2go-default-textstyle"
                                              style="
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                word-break: break-word;
                                                color: #3b3f44;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <p style="margin: 0">
                                                  <strong>Groupera</strong>
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="r9-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r10-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class="r25-i nl2go-default-textstyle"
                                              style="
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                word-break: break-word;
                                                color: #3b3f44;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                  "
                                                >
                                                  <span style="display: inline"
                                                    ><span
                                                      style="
                                                        background-color: rgb(
                                                          239,
                                                          242,
                                                          247
                                                        );
                                                        color: rgb(55, 65, 81);
                                                      "
                                                      >Diese E-Mail wurde
                                                      an</span
                                                    ></span
                                                  >
                                                  {{contact.EMAIL}} gesendet
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="r9-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r10-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class="r26-i nl2go-default-textstyle"
                                              style="
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                word-break: break-word;
                                                color: #3b3f44;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                  "
                                                >
                                                  <span style="display: inline"
                                                    ><span
                                                      style="
                                                        background-color: rgb(
                                                          247,
                                                          247,
                                                          248
                                                        );
                                                        color: rgb(55, 65, 81);
                                                        font-family: Söhne,
                                                          ui-sans-serif,
                                                          system-ui,
                                                          -apple-system,
                                                          Segoe UI, Roboto,
                                                          Ubuntu, Cantarell,
                                                          Noto Sans, sans-serif,
                                                          Helvetica Neue, Arial,
                                                          Apple Color Emoji,
                                                          Segoe UI Emoji,
                                                          Segoe UI Symbol,
                                                          Noto Color Emoji;
                                                      "
                                                      >Du erhältst diese E-Mail,
                                                      weil du dich bei Groupera
                                                      registriert hast.</span
                                                    ></span
                                                  >
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="r9-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r10-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class="r27-i nl2go-default-textstyle"
                                              style="
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                word-break: break-word;
                                                color: #3b3f44;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                padding-bottom: 15px;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                  "
                                                >
                                                  <a
                                                    title="Abmelden"
                                                    target="_blank"
                                                    style="
                                                      color: #0092ff;
                                                      text-decoration: underline;
                                                    "
                                                    ><span
                                                      style="
                                                        color: #a64d79;
                                                        font-size: 18px;
                                                      "
                                                      >Abmelden</span
                                                    ></a
                                                  >
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="r16-c" align="center">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          align="center"
                                          class="r3-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              valign="top"
                                              class="r28-i"
                                              style="padding-bottom: 15px"
                                            >
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                role="presentation"
                                              >
                                                <tr>
                                                  <td
                                                    class="r29-c"
                                                    align="center"
                                                  >
                                                    <table
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                      border="0"
                                                      role="presentation"
                                                      width="129"
                                                      class="r30-o"
                                                      style="
                                                        table-layout: fixed;
                                                      "
                                                    >
                                                      <tr>
                                                        <td
                                                          height="48"
                                                          style="
                                                            font-size: 0px;
                                                            line-height: 0px;
                                                          "
                                                        >
                                                          <a
                                                            href="https://www.brevo.com?utm_source=logo_client&utm_medium=email"
                                                            ><img
                                                              src="https://creative-assets.mailinblue.com/rnb-assets/en.png"
                                                              width="129"
                                                              border="0"
                                                              style="
                                                                display: block;
                                                                width: 100%;
                                                              "/></a>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
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
</html>`;

exports.passwordReset = (name, email, link) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Passwortzurücksetzung für Dein Groupera-Konto</title>
    <style type="text/css" emogrify="no">
      #outlook a {
        padding: 0;
      }
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }
      table td {
        border-collapse: collapse;
        mso-line-height-rule: exactly;
      }
      .editable.image {
        font-size: 0 !important;
        line-height: 0 !important;
      }
      .nl2go_preheader {
        display: none !important;
        mso-hide: all !important;
        mso-line-height-rule: exactly;
        visibility: hidden !important;
        line-height: 0px !important;
        font-size: 0px !important;
      }
      body {
        width: 100% !important;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        margin: 0;
        padding: 0;
      }
      img {
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
      a img {
        border: none;
      }
      table {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      th {
        font-weight: normal;
        text-align: left;
      }
      *[class="gmail-fix"] {
        display: none !important;
      }
    </style>
    <style type="text/css" emogrify="no">
      @media (max-width: 600px) {
        .gmx-killpill {
          content: " ` + '\03D1' + `";
        }
      }
    </style>
    <style type="text/css" emogrify="no">
      @media (max-width: 600px) {
        .gmx-killpill {
          content: " ` + '\03D1' + `";
        }
        .r0-o {
          border-style: solid !important;
          margin: 0 auto 0 auto !important;
          width: 320px !important;
        }
        .r1-i {
          background-color: #ffffff !important;
        }
        .r2-c {
          box-sizing: border-box !important;
          text-align: center !important;
          valign: top !important;
          width: 100% !important;
        }
        .r3-o {
          border-style: solid !important;
          margin: 0 auto 0 auto !important;
          width: 100% !important;
        }
        .r4-i {
          padding-bottom: 20px !important;
          padding-left: 15px !important;
          padding-right: 15px !important;
          padding-top: 20px !important;
        }
        .r5-c {
          box-sizing: border-box !important;
          display: block !important;
          valign: top !important;
          width: 100% !important;
        }
        .r6-o {
          border-style: solid !important;
          width: 100% !important;
        }
        .r7-i {
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .r8-o {
          border-style: solid !important;
          margin: 0 auto 0 auto !important;
          width: 70% !important;
        }
        .r9-i {
          padding-bottom: 20px !important;
          padding-left: 10px !important;
          padding-right: 10px !important;
          padding-top: 20px !important;
        }
        .r10-c {
          box-sizing: border-box !important;
          text-align: left !important;
          valign: top !important;
          width: 100% !important;
        }
        .r11-o {
          border-style: solid !important;
          margin: 0 auto 0 0 !important;
          width: 100% !important;
        }
        .r12-i {
          padding-bottom: 15px !important;
          padding-top: 15px !important;
          text-align: center !important;
        }
        .r13-i {
          padding-bottom: 15px !important;
          padding-top: 25px !important;
          text-align: left !important;
        }
        .r14-c {
          box-sizing: border-box !important;
          width: 100% !important;
        }
        .r15-i {
          padding-bottom: 15px !important;
          padding-top: 15px !important;
        }
        .r16-i {
          padding-bottom: 15px !important;
          padding-top: 15px !important;
          text-align: left !important;
        }
        .r17-i {
          padding-top: 15px !important;
          text-align: left !important;
        }
        .r18-i {
          padding-top: 15px !important;
          text-align: center !important;
        }
        .r19-c {
          box-sizing: border-box !important;
          text-align: center !important;
          width: 100% !important;
        }
        .r20-i {
          font-size: 0px !important;
          padding-bottom: 15px !important;
          padding-left: 105px !important;
          padding-right: 105px !important;
          padding-top: 15px !important;
        }
        .r21-c {
          box-sizing: border-box !important;
          width: 32px !important;
        }
        .r22-o {
          border-style: solid !important;
          margin-right: 8px !important;
          width: 32px !important;
        }
        .r23-i {
          padding-bottom: 5px !important;
          padding-top: 5px !important;
        }
        .r24-o {
          border-style: solid !important;
          margin-right: 0px !important;
          width: 32px !important;
        }
        .r25-o {
          background-size: auto !important;
          border-style: solid !important;
          margin: 0 auto 0 auto !important;
          width: 50% !important;
        }
        .r26-i {
          color: #3b3f44 !important;
          padding-bottom: 0px !important;
          padding-top: 15px !important;
          text-align: center !important;
        }
        .r27-i {
          color: #3b3f44 !important;
          padding-bottom: 0px !important;
          padding-top: 0px !important;
          text-align: center !important;
        }
        .r28-i {
          color: #3b3f44 !important;
          padding-bottom: 15px !important;
          padding-top: 15px !important;
          text-align: center !important;
        }
        .r29-i {
          padding-bottom: 15px !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
          padding-top: 0px !important;
        }
        .r30-c {
          box-sizing: border-box !important;
          text-align: center !important;
          valign: top !important;
          width: 129px !important;
        }
        .r31-o {
          border-style: solid !important;
          margin: 0 auto 0 auto !important;
          width: 129px !important;
        }
        body {
          -webkit-text-size-adjust: none;
        }
        .nl2go-responsive-hide {
          display: none;
        }
        .nl2go-body-table {
          min-width: unset !important;
        }
        .mobshow {
          height: auto !important;
          overflow: visible !important;
          max-height: unset !important;
          visibility: visible !important;
          border: none !important;
        }
        .resp-table {
          display: inline-table !important;
        }
        .magic-resp {
          display: table-cell !important;
        }
      }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css" emogrify="no">
      @import url("https://fonts.googleapis.com/css2?family=Roboto");
      @import url("https://fonts.googleapis.com/css2?family=S");
    </style>
    <!--<![endif]-->
    <style type="text/css">
      p,
      h1,
      h2,
      h3,
      h4,
      ol,
      ul {
        margin: 0;
      }
      a,
      a:link {
        color: #a64d79;
        text-decoration: underline;
      }
      .nl2go-default-textstyle {
        color: #3b3f44;
        font-family: Roboto, Arial;
        font-size: 18px;
        line-height: 1.5;
        word-break: break-word;
      }
      .default-button {
        color: #ffffff;
        font-family: Roboto, Arial;
        font-size: 16px;
        font-style: normal;
        font-weight: bold;
        line-height: 1.15;
        text-decoration: none;
        word-break: break-word;
      }
      .default-heading1 {
        color: #1f2d3d;
        font-family: Roboto, Arial;
        font-size: 36px;
        word-break: break-word;
      }
      .default-heading2 {
        color: #1f2d3d;
        font-family: Roboto, Arial;
        font-size: 32px;
        word-break: break-word;
      }
      .default-heading3 {
        color: #1f2d3d;
        font-family: Roboto, Arial;
        font-size: 24px;
        word-break: break-word;
      }
      .default-heading4 {
        color: #1f2d3d;
        font-family: Roboto, Arial;
        font-size: 18px;
        word-break: break-word;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .no-show-for-you {
        border: none;
        display: none;
        float: none;
        font-size: 0;
        height: 0;
        line-height: 0;
        max-height: 0;
        mso-hide: all;
        overflow: hidden;
        table-layout: fixed;
        visibility: hidden;
        width: 0;
      }
    </style>
    <!--[if mso
      ]><xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG /> <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml><!
    [endif]-->
    <style type="text/css">
      a:link {
        color: #a64d79;
        text-decoration: underline;
      }
    </style>
  </head>
  <body
    bgcolor="#ffffff"
    text="#3b3f44"
    link="#a64d79"
    yahoo="fix"
    style="background-color: #ffffff"
  >
    <table
      cellspacing="0"
      cellpadding="0"
      border="0"
      role="presentation"
      class="nl2go-body-table"
      width="100%"
      style="background-color: #ffffff; width: 100%"
    >
      <tr>
        <td>
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            role="presentation"
            width="600"
            align="center"
            class="r0-o"
            style="table-layout: fixed; width: 600px"
          >
            <tr>
              <td valign="top" class="r1-i" style="background-color: #ffffff">
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%"
                >
                  <tr>
                    <td
                      class="r4-i"
                      style="padding-bottom: 20px; padding-top: 20px"
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            class="r5-c"
                            style="font-weight: normal"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r6-o"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td
                                  valign="top"
                                  class="r7-i"
                                  style="
                                    padding-left: 10px;
                                    padding-right: 10px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="r2-c" align="center">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="200"
                                          class="r8-o"
                                          style="
                                            table-layout: fixed;
                                            width: 200px;
                                          "
                                        >
                                          <tr>
                                            <td
                                              style="
                                                font-size: 0px;
                                                line-height: 0px;
                                              "
                                            >
                                              <img
                                                src="https://img.mailinblue.com/6640989/images/content_library/original/652d3509e4187a5c7f7a89c3.jpg"
                                                width="200"
                                                border="0"
                                                style="
                                                  display: block;
                                                  width: 100%;
                                                "
                                              />
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%"
                >
                  <tr>
                    <td
                      class="r9-i"
                      style="padding-bottom: 20px; padding-top: 20px"
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            class="r5-c"
                            style="font-weight: normal"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r6-o"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td valign="top" class="r7-i">
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="r10-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r11-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class="r12-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: Roboto, Arial;
                                                font-size: 18px;
                                                word-break: break-word;
                                                line-height: 1.5;
                                                padding-bottom: 15px;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <h1
                                                  class="default-heading1"
                                                  style="
                                                    margin: 0;
                                                    color: #1f2d3d;
                                                    font-family: Roboto, Arial;
                                                    font-size: 36px;
                                                    word-break: break-word;
                                                  "
                                                >
                                                  <span
                                                    style="
                                                      color: #a64d79;
                                                      font-size: 36px;
                                                    "
                                                    >Hast Du Dein Passwort
                                                    vergessen?</span
                                                  >
                                                </h1>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="r10-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r11-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="left"
                                              valign="top"
                                              class="r13-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: Roboto, Arial;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                word-break: break-word;
                                                padding-bottom: 15px;
                                                padding-top: 25px;
                                                text-align: left;
                                              "
                                            >
                                              <div>
                                                <p
                                                  style="
                                                    --tw-border-spacing-x: 0;
                                                    --tw-border-spacing-y: 0;
                                                    --tw-ring-color: rgba(
                                                      69,
                                                      89,
                                                      164,
                                                      0.5
                                                    );
                                                    --tw-ring-offset-color: #fff;
                                                    --tw-ring-offset-shadow: 0 0
                                                      transparent;
                                                    --tw-ring-offset-width: 0px;
                                                    --tw-ring-shadow: 0 0
                                                      transparent;
                                                    --tw-rotate: 0;
                                                    --tw-scale-x: 1;
                                                    --tw-scale-y: 1;
                                                    --tw-scroll-snap-strictness: proximity;
                                                    --tw-shadow-colored: 0 0
                                                      transparent;
                                                    --tw-shadow: 0 0 transparent;
                                                    --tw-skew-x: 0;
                                                    --tw-skew-y: 0;
                                                    --tw-translate-x: 0;
                                                    --tw-translate-y: 0;
                                                    -webkit-text-stroke-width: 0px;
                                                    border: 0px solid
                                                      rgb(217, 217, 227);
                                                    box-sizing: border-box;
                                                    caret-color: rgb(
                                                      55,
                                                      65,
                                                      81
                                                    );
                                                    color: rgb(55, 65, 81);
                                                    font-family: Söhne,
                                                      ui-sans-serif, system-ui,
                                                      -apple-system, Segoe UI,
                                                      Roboto, Ubuntu, Cantarell,
                                                      Noto Sans, sans-serif,
                                                      Helvetica Neue, Arial,
                                                      Apple Color Emoji,
                                                      Segoe UI Emoji,
                                                      Segoe UI Symbol,
                                                      Noto Color Emoji;
                                                    font-variant-caps: normal;
                                                    letter-spacing: normal;
                                                    margin: 0px 0px 1.25em;
                                                    orphans: auto;
                                                    text-decoration: none;
                                                    text-indent: 0px;
                                                    text-transform: none;
                                                    white-space: pre-wrap;
                                                    widows: auto;
                                                    word-spacing: 0px;
                                                  "
                                                >
                                                  <span style="color: #000000"
                                                    >Hallo ${name},</span
                                                  >
                                                </p>
                                                <p
                                                  style="
                                                    --tw-border-spacing-x: 0;
                                                    --tw-border-spacing-y: 0;
                                                    --tw-ring-color: rgba(
                                                      69,
                                                      89,
                                                      164,
                                                      0.5
                                                    );
                                                    --tw-ring-offset-color: #fff;
                                                    --tw-ring-offset-shadow: 0 0
                                                      transparent;
                                                    --tw-ring-offset-width: 0px;
                                                    --tw-ring-shadow: 0 0
                                                      transparent;
                                                    --tw-rotate: 0;
                                                    --tw-scale-x: 1;
                                                    --tw-scale-y: 1;
                                                    --tw-scroll-snap-strictness: proximity;
                                                    --tw-shadow-colored: 0 0
                                                      transparent;
                                                    --tw-shadow: 0 0 transparent;
                                                    --tw-skew-x: 0;
                                                    --tw-skew-y: 0;
                                                    --tw-translate-x: 0;
                                                    --tw-translate-y: 0;
                                                    -webkit-text-stroke-width: 0px;
                                                    border: 0px solid
                                                      rgb(217, 217, 227);
                                                    box-sizing: border-box;
                                                    caret-color: rgb(
                                                      55,
                                                      65,
                                                      81
                                                    );
                                                    color: rgb(55, 65, 81);
                                                    font-family: Söhne,
                                                      ui-sans-serif, system-ui,
                                                      -apple-system, Segoe UI,
                                                      Roboto, Ubuntu, Cantarell,
                                                      Noto Sans, sans-serif,
                                                      Helvetica Neue, Arial,
                                                      Apple Color Emoji,
                                                      Segoe UI Emoji,
                                                      Segoe UI Symbol,
                                                      Noto Color Emoji;
                                                    font-variant-caps: normal;
                                                    letter-spacing: normal;
                                                    margin: 1.25em 0px;
                                                    orphans: auto;
                                                    text-decoration: none;
                                                    text-indent: 0px;
                                                    text-transform: none;
                                                    white-space: pre-wrap;
                                                    widows: auto;
                                                    word-spacing: 0px;
                                                  "
                                                >
                                                  <span style="color: #000000"
                                                    >Wir haben eine Anfrage zur
                                                    Zurücksetzung des Passworts
                                                    für das Groupera-Konto, das
                                                    mit ${email} verknüpft ist, erhalten.
                                                    Es wurden noch keine
                                                    Änderungen an Deinem Konto
                                                    vorgenommen.</span
                                                  >
                                                </p>
                                                <p
                                                  style="
                                                    --tw-border-spacing-x: 0;
                                                    --tw-border-spacing-y: 0;
                                                    --tw-ring-color: rgba(
                                                      69,
                                                      89,
                                                      164,
                                                      0.5
                                                    );
                                                    --tw-ring-offset-color: #fff;
                                                    --tw-ring-offset-shadow: 0 0
                                                      transparent;
                                                    --tw-ring-offset-width: 0px;
                                                    --tw-ring-shadow: 0 0
                                                      transparent;
                                                    --tw-rotate: 0;
                                                    --tw-scale-x: 1;
                                                    --tw-scale-y: 1;
                                                    --tw-scroll-snap-strictness: proximity;
                                                    --tw-shadow-colored: 0 0
                                                      transparent;
                                                    --tw-shadow: 0 0 transparent;
                                                    --tw-skew-x: 0;
                                                    --tw-skew-y: 0;
                                                    --tw-translate-x: 0;
                                                    --tw-translate-y: 0;
                                                    -webkit-text-stroke-width: 0px;
                                                    border: 0px solid
                                                      rgb(217, 217, 227);
                                                    box-sizing: border-box;
                                                    caret-color: rgb(
                                                      55,
                                                      65,
                                                      81
                                                    );
                                                    color: rgb(55, 65, 81);
                                                    font-family: Söhne,
                                                      ui-sans-serif, system-ui,
                                                      -apple-system, Segoe UI,
                                                      Roboto, Ubuntu, Cantarell,
                                                      Noto Sans, sans-serif,
                                                      Helvetica Neue, Arial,
                                                      Apple Color Emoji,
                                                      Segoe UI Emoji,
                                                      Segoe UI Symbol,
                                                      Noto Color Emoji;
                                                    font-variant-caps: normal;
                                                    letter-spacing: normal;
                                                    margin: 1.25em 0px 0px;
                                                    orphans: auto;
                                                    text-decoration: none;
                                                    text-indent: 0px;
                                                    text-transform: none;
                                                    white-space: pre-wrap;
                                                    widows: auto;
                                                    word-spacing: 0px;
                                                  "
                                                >
                                                  <span style="color: #000000"
                                                    >Du kannst Dein Passwort
                                                    zurücksetzen, indem Du auf
                                                    den unten stehenden Link
                                                    klickst:</span
                                                  >
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="r14-c">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="600"
                                          class="r6-o"
                                          style="
                                            table-layout: fixed;
                                            width: 600px;
                                          "
                                        >
                                          <tr>
                                            <td
                                              class="r15-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: Roboto, Arial;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                word-break: break-word;
                                                padding-bottom: 15px;
                                                padding-top: 15px;
                                              "
                                            >
                                            <br /><a
                                                href="${link}"
                                                style="
                                                  color: #a64d79;
                                                  text-decoration: underline;
                                                "
                                                >Passwort zurücksetzen</a
                                              >
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="r10-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r11-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="left"
                                              valign="top"
                                              class="r16-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: Roboto, Arial;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                word-break: break-word;
                                                padding-bottom: 15px;
                                                padding-top: 15px;
                                                text-align: left;
                                              "
                                            >
                                              <div>
                                                <p style="margin: 0">
                                                  <span style="display: inline"
                                                    ><span
                                                      style="
                                                        color: #000000;
                                                        font-family: Söhne,
                                                          ui-sans-serif,
                                                          system-ui,
                                                          -apple-system,
                                                          Segoe UI, Roboto,
                                                          Ubuntu, Cantarell,
                                                          Noto Sans, sans-serif,
                                                          Helvetica Neue, Arial,
                                                          Apple Color Emoji,
                                                          Segoe UI Emoji,
                                                          Segoe UI Symbol,
                                                          Noto Color Emoji;
                                                      "
                                                      >Hast Du nicht um ein
                                                      neues Passwort gebeten? Du
                                                      kannst diese E-Mail
                                                      ignorieren.</span
                                                    ></span
                                                  >
                                                </p>
                                                <p style="margin: 0"> </p>
                                                <p style="margin: 0">
                                                  <span style="display: inline"
                                                    ><span
                                                      style="
                                                        color: #000000;
                                                        font-family: Söhne,
                                                          ui-sans-serif,
                                                          system-ui,
                                                          -apple-system,
                                                          Segoe UI, Roboto,
                                                          Ubuntu, Cantarell,
                                                          Noto Sans, sans-serif,
                                                          Helvetica Neue, Arial,
                                                          Apple Color Emoji,
                                                          Segoe UI Emoji,
                                                          Segoe UI Symbol,
                                                          Noto Color Emoji;
                                                        font-size: 24px;
                                                      "
                                                      >Du hast Fragen oder
                                                      Anliegen? Kontaktiere uns
                                                      gerne.</span
                                                    ></span
                                                  >
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="r10-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r11-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="left"
                                              valign="top"
                                              class="r17-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: Roboto, Arial;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                word-break: break-word;
                                                padding-top: 15px;
                                                text-align: left;
                                              "
                                            >
                                              <div>
                                                <h2
                                                  class="default-heading2"
                                                  style="
                                                    margin: 0;
                                                    color: #1f2d3d;
                                                    font-family: Roboto, Arial;
                                                    font-size: 32px;
                                                    word-break: break-word;
                                                  "
                                                >
                                                  <span
                                                    style="
                                                      color: #a64d79;
                                                      font-size: 24px;
                                                    "
                                                    >Dein Groupera Team</span
                                                  >
                                                </h2>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%"
                >
                  <tr>
                    <td
                      class="r4-i"
                      style="padding-bottom: 20px; padding-top: 20px"
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            class="r5-c"
                            style="font-weight: normal"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r6-o"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td
                                  valign="top"
                                  class="r7-i"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="r10-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r11-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class="r18-i nl2go-default-textstyle"
                                              style="
                                                color: #3b3f44;
                                                font-family: Roboto, Arial;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                word-break: break-word;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <h2
                                                  class="default-heading2"
                                                  style="
                                                    margin: 0;
                                                    color: #1f2d3d;
                                                    font-family: Roboto, Arial;
                                                    font-size: 32px;
                                                    word-break: break-word;
                                                  "
                                                >
                                                  <span style="font-size: 24px"
                                                    >Folge uns auf</span
                                                  >
                                                </h2>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%"
                >
                  <tr>
                    <td
                      class="r4-i"
                      style="padding-bottom: 20px; padding-top: 20px"
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            class="r5-c"
                            style="font-weight: normal"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r6-o"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td
                                  valign="top"
                                  class="r7-i"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="r19-c" align="center">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="570"
                                          align="center"
                                          class="r3-o"
                                          style="
                                            table-layout: fixed;
                                            width: 570px;
                                          "
                                        >
                                          <tr>
                                            <td valign="top">
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                role="presentation"
                                              >
                                                <tr>
                                                  <td
                                                    class="r14-c"
                                                    style="
                                                      display: inline-block;
                                                    "
                                                  >
                                                    <table
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                      border="0"
                                                      role="presentation"
                                                      width="570"
                                                      class="r6-o"
                                                      style="
                                                        table-layout: fixed;
                                                        width: 570px;
                                                      "
                                                    >
                                                      <tr>
                                                        <td
                                                          class="r20-i"
                                                          style="
                                                            padding-bottom: 15px;
                                                            padding-left: 249px;
                                                            padding-right: 249px;
                                                            padding-top: 15px;
                                                          "
                                                        >
                                                          <table
                                                            width="100%"
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            role="presentation"
                                                          >
                                                            <tr>
                                                              <th
                                                                width="40"
                                                                class="r21-c mobshow resp-table"
                                                                style="
                                                                  font-weight: normal;
                                                                "
                                                              >
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="100%"
                                                                  class="r22-o"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 100%;
                                                                  "
                                                                >
                                                                  <tr>
                                                                    <td
                                                                      class="r23-i"
                                                                      style="
                                                                        font-size: 0px;
                                                                        line-height: 0px;
                                                                        padding-bottom: 5px;
                                                                        padding-top: 5px;
                                                                      "
                                                                    >
                                                                      <a
                                                                        href="https://instagram.com/groupera.de?igshid=MzRlODBiNWFlZA=="
                                                                        target="_blank"
                                                                        style="
                                                                          color: #a64d79;
                                                                          text-decoration: underline;
                                                                        "
                                                                      >
                                                                        <img
                                                                          src="https://creative-assets.mailinblue.com/editor/social-icons/rounded_colored/instagram_32px.png"
                                                                          width="32"
                                                                          border="0"
                                                                          style="
                                                                            display: block;
                                                                            width: 100%;
                                                                          "
                                                                      /></a>
                                                                    </td>
                                                                    <td
                                                                      class="nl2go-responsive-hide"
                                                                      width="8"
                                                                      style="
                                                                        font-size: 0px;
                                                                        line-height: 1px;
                                                                      "
                                                                    >
                                                                      ­
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </th>
                                                              <th
                                                                width="32"
                                                                class="r21-c mobshow resp-table"
                                                                style="
                                                                  font-weight: normal;
                                                                "
                                                              >
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="100%"
                                                                  class="r24-o"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 100%;
                                                                  "
                                                                >
                                                                  <tr>
                                                                    <td
                                                                      class="r23-i"
                                                                      style="
                                                                        font-size: 0px;
                                                                        line-height: 0px;
                                                                        padding-bottom: 5px;
                                                                        padding-top: 5px;
                                                                      "
                                                                    >
                                                                      <a
                                                                        href="https://www.facebook.com/61552096289948"
                                                                        target="_blank"
                                                                        style="
                                                                          color: #a64d79;
                                                                          text-decoration: underline;
                                                                        "
                                                                      >
                                                                        <img
                                                                          src="https://creative-assets.mailinblue.com/editor/social-icons/rounded_colored/facebook_32px.png"
                                                                          width="32"
                                                                          border="0"
                                                                          style="
                                                                            display: block;
                                                                            width: 100%;
                                                                          "
                                                                      /></a>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </th>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="100%"
                  align="center"
                  class="r3-o"
                  style="table-layout: fixed; width: 100%"
                >
                  <tr>
                    <td
                      class="r4-i"
                      style="padding-bottom: 20px; padding-top: 20px"
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        role="presentation"
                      >
                        <tr>
                          <th
                            width="100%"
                            valign="top"
                            class="r5-c"
                            style="font-weight: normal"
                          >
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              role="presentation"
                              width="100%"
                              class="r6-o"
                              style="table-layout: fixed; width: 100%"
                            >
                              <tr>
                                <td
                                  valign="top"
                                  class="r7-i"
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td class="r2-c" align="center">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="136"
                                          class="r25-o"
                                          style="
                                            table-layout: fixed;
                                            width: 136px;
                                          "
                                        >
                                          <tr>
                                            <td
                                              class="r15-i"
                                              style="
                                                font-size: 0px;
                                                line-height: 0px;
                                                padding-bottom: 15px;
                                                padding-top: 15px;
                                              "
                                            >
                                              <img
                                                src="https://img.mailinblue.com/6640989/images/content_library/original/652919b5fe175c048e303b27.png"
                                                width="136"
                                                border="0"
                                                style="
                                                  display: block;
                                                  width: 100%;
                                                "
                                              />
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="r10-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r11-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class="r26-i nl2go-default-textstyle"
                                              style="
                                                font-family: Roboto, Arial;
                                                word-break: break-word;
                                                color: #3b3f44;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                  "
                                                >
                                                  <span style="display: inline"
                                                    ><span
                                                      style="
                                                        background-color: rgb(
                                                          239,
                                                          242,
                                                          247
                                                        );
                                                        color: rgb(55, 65, 81);
                                                      "
                                                      >Diese E-Mail wurde
                                                      an</span
                                                    ></span
                                                  > {{ contact.EMAIL }} gesendet
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="r10-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r11-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class="r27-i nl2go-default-textstyle"
                                              style="
                                                font-family: Roboto, Arial;
                                                word-break: break-word;
                                                color: #3b3f44;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                  "
                                                >
                                                  <span style="display: inline"
                                                    ><span
                                                      style="
                                                        color: rgb(55, 65, 81);
                                                        font-family: Söhne,
                                                          ui-sans-serif,
                                                          system-ui,
                                                          -apple-system,
                                                          Segoe UI, Roboto,
                                                          Ubuntu, Cantarell,
                                                          Noto Sans, sans-serif,
                                                          Helvetica Neue, Arial,
                                                          Apple Color Emoji,
                                                          Segoe UI Emoji,
                                                          Segoe UI Symbol,
                                                          Noto Color Emoji;
                                                      "
                                                      >Du hast diese E-Mail
                                                      erhalten, weil du eine
                                                      Passwortänderung angefragt
                                                      hast</span
                                                    ></span
                                                  >
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="r10-c" align="left">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          class="r11-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              class="r28-i nl2go-default-textstyle"
                                              style="
                                                font-family: Roboto, Arial;
                                                word-break: break-word;
                                                color: #3b3f44;
                                                font-size: 18px;
                                                line-height: 1.5;
                                                padding-bottom: 15px;
                                                padding-top: 15px;
                                                text-align: center;
                                              "
                                            >
                                              <div>
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                  "
                                                >
                                                  <a
                                                    href="http://www.groupera.de"
                                                    target="_blank"
                                                    style="
                                                      color: #a64d79;
                                                      text-decoration: underline;
                                                    "
                                                    >Im Browser ansehen </a
                                                  >
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="r19-c" align="center">
                                        <table
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                          width="100%"
                                          align="center"
                                          class="r3-o"
                                          style="
                                            table-layout: fixed;
                                            width: 100%;
                                          "
                                        >
                                          <tr>
                                            <td
                                              valign="top"
                                              class="r29-i"
                                              style="padding-bottom: 15px"
                                            >
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                role="presentation"
                                              >
                                                <tr>
                                                  <td
                                                    class="r30-c"
                                                    align="center"
                                                  >
                                                    <table
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                      border="0"
                                                      role="presentation"
                                                      width="129"
                                                      class="r31-o"
                                                      style="
                                                        table-layout: fixed;
                                                      "
                                                    >
                                                      <tr>
                                                        <td
                                                          height="48"
                                                          style="
                                                            font-size: 0px;
                                                            line-height: 0px;
                                                          "
                                                        >
                                                          <a
                                                            href="https://www.brevo.com?utm_source=logo_client&utm_medium=email"
                                                            ><img
                                                              src="https://creative-assets.mailinblue.com/rnb-assets/en.png"
                                                              width="129"
                                                              height="48"
                                                              border="0"
                                                              style="
                                                                display: block;
                                                                width: 100%;
                                                              "
                                                          /></a>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
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
</html>
`;