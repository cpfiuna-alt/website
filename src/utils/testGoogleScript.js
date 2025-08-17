// Test Google Apps Script endpoint
const testGoogleScript = async () => {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    subject: "Test Message",
    message: "This is a test message to verify the Google Apps Script is working."
  };

  console.log("Testing Google Apps Script endpoint...");
  console.log("URL:", "https://script.google.com/macros/s/AKfycbw3j5FMVQnOqfwu-wn2w24qf6mM73SRZfbfraDycz__YKS5lfjCR21S7UCQ2LoO1s4X/exec");
  
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbw3j5FMVQnOqfwu-wn2w24qf6mM73SRZfbfraDycz__YKS5lfjCR21S7UCQ2LoO1s4X/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      }
    );
    
    console.log("Request sent successfully (no-cors mode)");
    console.log("Check your Google Sheets to see if the test data appeared");
    
  } catch (error) {
    console.error("Error testing Google Apps Script:", error);
  }
};

// Run this in browser console to test
// testGoogleScript();

export default testGoogleScript;
