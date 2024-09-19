import fs from 'fs';
import config from '../../config.cjs';

const handleGreeting = async (m, gss) => {
  try {
    const textLower = m.body.toLowerCase();

    const triggerWords = [
      'save', 'sv', 'seve', 'sav', 'sev', 'send', 'dapam', 'dpm', 'dapm', 'dpam', 'dapan', 'dapn', 'dpn', 'dpan', 'one', 'oni', 'ewanna', 'ewann', 'ewnn', 'evanna', 'evann', 'evnn', 'ewahan', 'ewahn', 'ewhan', 'ewhn', 'evahan', 'evahn', 'evhn', 'ewaham', 'ewahm', 'ewham', 'ewhm', 'evaham', 'evahm', 'danna', 'dann', 'dnna', 'dannako', 'dannko', 'dnnako', 'dnnko', 'dako', 'dko', 'evhm', 'meka', 'mekath',
      'ewannako', 'ewannko', 'ewnnko', 'evannako', 'evannko', 'evnnko', 'dahan', 'ewa', 'eva', 'ewano', 'ewno', 'evano', 'evno', 'ewapan', 'ewpn', 'ewpan', 'ewapn', 'evapan', 'evpn', 'evpan', 'evapn', 'ewapam', 'ewpm', 'ewpam', 'ewapm', 'evapam', 'evpm', 'evpam', 'evapm', 'snd', 'ewana', 'ewan', 'ewna', 'evana', 'evan', 'evna', 'status down', 'take', 'sent', 'giv', 'gib', 'upload', 'share', 'send me', 'sent me', 'znt', 'snt', 'ayak', 'do', 'mee'
    ];

    if (triggerWords.includes(textLower)) {
      if (m.message && m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo) {
        const quotedMessage = m.message.extendedTextMessage.contextInfo.quotedMessage;

        if (quotedMessage) {
          // Check if it's an image
          if (quotedMessage.imageMessage) {
            const imageCaption = quotedMessage.imageMessage.caption;
            const imageUrl = await gss.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
            await gss.sendMessage(m.from, {
              image: { url: imageUrl },
              caption: imageCaption,
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: false,
              },
            });
          }

          // Check if it's a video
          if (quotedMessage.videoMessage) {
            const videoCaption = quotedMessage.videoMessage.caption;
            const videoUrl = await gss.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
            await gss.sendMessage(m.from, {
              video: { url: videoUrl },
              caption: videoCaption,
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: false,
              },
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export default handleGreeting;
