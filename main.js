import express from 'express'
import Replicate from 'replicate'

const app = express()

app.use(express.json());

app.post('/generate', async(req, res)=>{
    
const {prompt} = req.body

if(!prompt){
    return res.status(400).json({error:"Prompt is required"});
}

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
})

const input= {
    mask: "https://replicate.delivery/pbxt/HtGQBqO9MtVbPm0G0K43nsvvjBB0E0PaWOhuNRrRBBT4ttbf/mask.png",
    image: "https://replicate.delivery/pbxt/HtGQBfA5TrqFYZBf0UL18NTqHrzt8UiSIsAkUuMHtjvFDO6p/overture-creations-5sI6fQgYIuo.png",
    width: 512,
    height: 512,
    prompt: prompt,
    scheduler: "DPMSolverMultistep",
    num_outputs: 1,
    guidance_scale: 7.5,
    num_inference_steps: 25
}
const output = await replicate.run(
    "stability-ai/stable-diffusion-inpainting:95b7223104132402a9ae91cc677285bc5eb997834bd2349fa486f53910fd68b3",
    {input}
    );
    console.log(output);
    res.json(output)
})


console.log('hello world')

app.listen(3000, ()=>{
    console.log('Server runnig on port 3000')
})