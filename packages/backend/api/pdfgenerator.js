const { degrees, PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const fontkit = require("@pdf-lib/fontkit");

async function getPdf(postings, user) {
  const fonturl = "HomemadeApple-Regular.ttf";
  const fontData = fs.readFileSync(fonturl);

  const url = "volunteer-form.pdf";
  const pdfData = fs.readFileSync(url);
  const pdfDoc = await PDFDocument.load(pdfData);
  pdfDoc.registerFontkit(fontkit);
  const signatureFont = await pdfDoc.embedFont(fontData);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  let name = `${user.first_name} ${
    user.middle_name !== "" ? " " + user.middle_name : ""
  }${user.last_name}`;

  let date = `${new Date(postings.date).getMonth() + 1}/${new Date(
    postings.date
  ).getDate()}/${new Date(postings.date).getFullYear()}`;
  firstPage.drawText(name, {
    x: 50,
    y: height - 132,
    size: 12,
    font: helveticaFont,
  });
  firstPage.drawText(user.student_id.toString(), {
    x: 416,
    y: height - 132,
    size: 12,
    font: helveticaFont,
  });
  firstPage.drawText("2021-2022", {
    x: 50,
    y: height - 198,
    size: 12,
    font: helveticaFont,
  });
  firstPage.drawText(user.school, {
    x: 416,
    y: height - 164,
    size: 12,
    font: helveticaFont,
  });

  let formSpace = 1;
  let totalHours = 0;
  let totalMinutes = 0;

  for (var i = 0; i < postings.timeslots.length || formSpace > 4; i++) {
    if (postings.timeslots[i].student_status.status === "signed") {
      let time = getHours(
        postings.timeslots[i].start_time,
        postings.timeslots[i].end_time
      );
      totalHours += time.hours;
      totalMinutes += time.minutes;

      formSpace++;
      firstPage.drawText(postings.title, {
        x: 35,
        y: height - 250 - formSpace * 40,
        size: 10,
        font: helveticaFont,
      });
      firstPage.drawText(time.hours + "h " + time.minutes + "m", {
        x: 400,
        y: height - 250 - formSpace * 40,
        size: 10,
        font: helveticaFont,
      });
      firstPage.drawText(date, {
        x: 445,
        y: height - 250 - formSpace * 40,
        size: 10,
        font: helveticaFont,
      });
      firstPage.drawText(postings.phone_number, {
        x: 516,
        y: height - 230 - formSpace * 40,
        size: 10,
        font: helveticaFont,
      });
      firstPage.drawText(postings.name, {
        x: 516,
        y: height - 240 - formSpace * 40,
        size: 10,
        font: helveticaFont,
      });
      firstPage.drawText(postings.supervisor, {
        x: 516,
        y: height - 250 - formSpace * 40,
        size: 10,
        font: helveticaFont,
      });
      firstPage.drawText(postings.supervisor, {
        x: width - 115,
        y: height - 250 - formSpace * 40,
        size: 10,
        font: signatureFont,
      });
    }
  }

  firstPage.drawText(totalHours + "h " + totalMinutes + "m", {
    x: 400,
    y: height - 450,
    size: 10,
    font: helveticaFont,
  });

  fs.writeFileSync("volunteer-form-temp.pdf", await pdfDoc.save());
}

const getHours = (start, end) => {
  var start_hours =
    start.includes("pm") && !start.includes("12")
      ? Number(start.match(/^(\d+)/)[1]) + 12
      : Number(start.match(/^(\d+)/)[1]);
  var start_minutes = Number(start.match(/:(\d+)/)[1]);
  var end_hours =
    end.includes("pm") && !end.includes("12")
      ? Number(end.match(/^(\d+)/)[1]) + 12
      : Number(end.match(/^(\d+)/)[1]);
  var end_minutes = Number(end.match(/:(\d+)/)[1]);

  var min_diff =
    end_hours * 60 + end_minutes - (start_hours * 60 + start_minutes);
  var hour_diff = Math.floor(min_diff / 60);

  return { hours: hour_diff, minutes: min_diff - hour_diff * 60 };
};

module.exports = getPdf;
