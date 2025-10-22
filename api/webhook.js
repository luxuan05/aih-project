// api/webhook.js
// Change the export line to use CommonJS
module.exports = function handler(req, res) {
  // Ensure you are accessing the function at /api/webhook

  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const postalCode = req.body.sessionInfo?.parameters?.postal_code?.toString() || '';
  const prefix = postalCode.substring(0,2);

  const singHealth = ['07','08','09','10','17','20','21','22','23','24','25','26','27','38','39','40','41','42','43','44','45','46','47','48','49','50','79','80','81','51','52'];
  const nup = ['11','12','13','14','15','16','58','59','60','61','62','63','64','65','66','67','68','69','70','71'];
  const nhg = ['18','19','28','29','30','31','32','33','34','35','36','37','53','54','55','56','57','82','72','73','77','78','75','76'];

  let cluster = 'Unknown';
  if(singHealth.includes(prefix)) cluster = 'SingHealth';
  else if(nup.includes(prefix)) cluster = 'NUP';
  else if(nhg.includes(prefix)) cluster = 'NHG';

  res.status(200).json({
    fulfillment_response: {
      messages: [
        { text: { text: [`Based on postal code ${postalCode}, your healthcare cluster is: ${cluster}.`] } }
      ]
    }
  });
}