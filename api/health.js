export default function handler(req,res){res.status(200).json({ok:true,naverConfigured:Boolean(process.env.NAVER_CLIENT_ID&&process.env.NAVER_CLIENT_SECRET)});}
