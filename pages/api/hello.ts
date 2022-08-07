// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

  // Get data from request
  const data = req.body;

  // guard against empty data
  if (!data.title) {
    return res.status(400).json({ error: 'Missing title' });
  }

  res.status(200).json({data: data.title});
}
