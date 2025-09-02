const sendWhatsAppMessage = async (senderPhone: string, message: string) => {
	const instance = process.env.EVO_INSTANCE;
	const key = process.env.EVO_API_KEY;
	const url = process.env.EVO_URL;

	if (!instance || !key || !url) {
		throw new Error("Evo API endpoint or key not configured.");
	}

	try {
		const protocol = url.includes('localhost') || url.includes('127.0.0.1') ? 'http' : 'https';
		const response = await fetch(
			`${protocol}://${url}/message/sendText/${instance}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					apiKey: key,
				},
				body: JSON.stringify({
					number: senderPhone,
					text: message,
				}),
			}
		);
		console.log("🚀 ~ sendWhatsAppMessage ~ response:", response)

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response;
	} catch (error) {
		console.error('WhatsApp send error:', error);
		throw new Error("Erro no envio da mensagem.", { cause: error });
	}
};

export default sendWhatsAppMessage;
