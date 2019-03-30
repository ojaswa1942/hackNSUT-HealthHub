const ipfsClient = require('ipfs-http-client');
const fs = require('fs');

const MAX_SIZE = 52428800;


const ipfs = ipfsClient({
  host: '127.0.0.1',
  port: 5001,
  protocol: 'http'
});

const handleUpload = (req,res, db) =>{
	if (!req.file) {
	    return res.status(422).json({
	      error: 'File needs to be provided.',
	    });
	}
  console.log(req.file);

  const fileSize = req.file.size;
  if (fileSize > MAX_SIZE) {
    fs.unlink(req.file.path);

    return res.status(422).json({
      error: `Image needs to be smaller than ${MAX_SIZE} bytes.`,
    });
  }

  const data = fs.readFileSync(req.file.path);
  return ipfs.add(data, (err, files) => {
    console.log(files);
    //fs.unlink(req.file.path);
    if (files) {
      ipfs.pin(files[0].hash, (err, res) => {
      	if(res) {
      		console.log('pinned: '+res[0].hash);
      	}
      });
      return res.json({
        hash: files[0].hash,
        link: 'https://ipfs.premsarswat.me/ipfs/'+files[0].hash
      });
    }
    return res.status(500).json({
      error: err,
    });
  });
}

module.exports = {
	handleUpload: handleUpload
};