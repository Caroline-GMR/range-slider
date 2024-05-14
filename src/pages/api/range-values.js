export default function handler(req, res) {
  res.status(200).json({
    min: 1,
    max: 100,
    rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]
  });
}
