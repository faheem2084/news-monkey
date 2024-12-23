import React, {useState} from 'react'

export default function TextForm(props) {
    
    const [text, setText] = useState('');

    const handleCopy = () =>{
        var text = document.getElementById("myBox");
        text.select();
        navigator.clipboard.writeText(text.value);
        props.showAlert("Copied to clipboard!", "success");


    }
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to Upper case!", "success");
    }

    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to Lower case!", "success");
    }

    const handleCapitalizeWords = () =>{
        let newText =  text.split(" ")
                        .map(words=> words.charAt(0).toUpperCase() + words.slice(1))
                        .join(" ");
        setText(newText)
    }

    const clearText = () =>{
        setText('');
        props.showAlert("Cleared text area!", "success");
    }

    const removeExtraSpaces = () =>{
        let newText = text.split(/[ ] +/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");

    }

    const handleOnChange = (event) => {
        // console.log("On handleOnChange() ...");
        setText(event.target.value);
    }

    const countWords = (words) =>{
        return words.trim().split(/\s+/).filter(word => word !== "").length;
    }
    return (
        <>    
            <div className='container' style={{ color: props.mode === 'dark' ? 'white': '#042743'  }} >
                <h1>{props.heading} - {props.mode}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value = {text} onChange = {handleOnChange} 
                    style={{ 
                        backgroundColor: props.mode === 'dark' ? 'grey' : 'white',
                        color: props.mode === 'dark' ? 'white' : '#042743'
                    }}                
                    id="myBox" rows="8"></textarea>
                </div>
                <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lower</button>
                <button className="btn btn-primary mx-1 my-1" onClick={clearText}>Clear Text</button>
                <button className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
                <button className="btn btn-primary mx-1 my-1" onClick={removeExtraSpaces}>Remove Extra Spaces</button>
                <button className="btn btn-primary mx-1 my-1" onClick={handleCapitalizeWords}>Capitalize Words</button>

            </div>
        
        <div className="container my-3" style={{color: props.mode === 'dark'? 'white': '#042743'  }}>
            <h2>Your text Summary</h2>
            
            <p>{countWords(text)} Words and {text.length} characters</p>

            <p>{(0.008 * text.split(" ").length).toFixed(2)} Minutes Read... </p>
            <h2>Preview</h2>
            <p>{text.length>0?text: "Enter some text to preview..." }</p>
        </div>

        </>
  )
}
