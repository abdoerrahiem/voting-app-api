module.exports = (candidates) => {
  return ` 
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      h1 {
        text-align: center;
        margin: 2rem 0;
      }

      .container {
        max-width: 1100px;
        margin: 0 auto;
      }

      .text-center {
        text-align: center;
      }

      table {
        border-collapse: collapse;
        width: 100%;
      }

      table td,
      table th {
        border: 1px solid #ddd;
        padding: 8px;
      }

      table tr:nth-child(even) {
        background-color: #f2f2f2;
      }

      table tr:hover {
        background-color: #ddd;
      }

      table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #4caf50;
        color: white;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
      }
    </style>
    <title>Hasil Voting</title>
  </head>
  <body>
    <h1>Hasil Voting</h1>
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>Nomor</th>
            <th>Nama Ketua</th>
            <th>Nama Wakil Ketua</th>
            <th>Jumlah Suara</th>
          </tr>
        </thead>
        <tbody>
          ${candidates.map(
            (candidate, index) =>
              `<tr>
            <td class="text-center">${index + 1}</td>
            <td>${candidate.nameOfChairman}</td>
            <td>${candidate.nameOfViceChairman}</td>
            <td class="text-center">${candidate.totalSuara}</td>
          </tr>`
          )}
        </tbody>
      </table>
    </div>
  </body>
</html>
  `
}
