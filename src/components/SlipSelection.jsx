import { useState, useEffect, useRef } from 'react'
import './SlipSelection.css'
import scrollImage from '../assets/scroll.jpg'

// Gayatri Mantra words
const mantraWords = [
  'ॐ',
  'भूः',
  'भुवः',
  'स्वः',
  'तत्',
  'सवितुः',
  'वरेण्यम्',
  'भर्गः',
  'देवस्य',
  'धीमहि',
  'धियो',
  'यः',
  'नः',
  'प्रचोदयात्'
]

// Word details mapping
const wordDetails = {
  'ॐ': {
    sanskrit: 'ॐ (प्रणव)',
    meaning: 'ॐ वह ध्वनि है जो थी जब कुछ नहीं था। जब न पृथ्वी थी, न आकाश था, न देवता थे, न मनुष्य थे - तब भी ॐ था। यह केवल शब्द नहीं, यह सृष्टि का बीज है।\n\nअ = ब्रह्मा, सृष्टि का आरंभ, जागृत अवस्था, स्थूल शरीर\n\nउ = विष्णु, सृष्टि का पालन, स्वप्न अवस्था, सूक्ष्म शरीर\n\nम = महेश, सृष्टि का संहार, सुषुप्ति अवस्था, कारण शरीर\n\nये तीनों मिलकर चौथी अवस्था में विलीन होते हैं - तुरीय - जहां केवल शुद्ध चैतन्य है।',
    guidance: 'जब तुम ॐ का उच्चारण करते हो, तुम केवल एक शब्द नहीं बोलते। तुम अपने अस्तित्व को उस आदि स्पंदन से जोड़ते हो। तुम्हारा कंपन ब्रह्मांड के कंपन से एक हो जाता है। यह योग है - मिलन है - जीवात्मा और परमात्मा का।\n\nजब शिशु पहली बार रोता है, वह ॐ की ही प्रतिध्वनि है। जब साधक अंतिम सांस लेता है, वह ॐ में ही विलीन होता है। आदि और अंत, सब ॐ में समाहित हैं।\n\nजब "ओम्" तुम्हारे सामने आए, तो जान लो: तुम केवल शरीर नहीं, केवल मन नहीं - तुम वह शून्य हो जिससे सब ध्वनि प्रकट होती है। तुम्हारी श्वास में, तुम्हारे हृदय की धड़कन में, तुम्हारे विचारों के बीच की खामोशी में - ओम् निरंतर गूंज रहा है।'
  },
  'भूः': {
    sanskrit: 'भूः (पृथ्वी लोक)',
    meaning: 'भूः केवल यह धरती नहीं जिस पर तुम खड़े हो। यह वह चेतना का स्तर है जहां पंच महाभूतों का प्रत्यक्ष अनुभव होता है - पृथ्वी, जल, अग्नि, वायु, आकाश।\n\nप्राण का स्थान: मूलाधार चक्र\n\nतत्व: पृथ्वी (धारण करने वाला)\n\nगुण: स्थिरता, धैर्य, सहनशीलता',
    guidance: 'तुम्हारे पैरों के नीचे की यह धरती तुम्हारी पहली गुरु है। हर पत्थर, हर मिट्टी का कण धैर्य सिखाता है। जब "भूः" तुम्हें पुकारे, समझ लो: तुम्हारा शरीर मंदिर है, जेलखाना नहीं। यह मांस-हड्डी का ढांचा परमात्मा का प्रयोग है स्थूल में सूक्ष्म को अनुभव करने का।\n\nतुम्हारी हर भूख, हर थकान, हर दर्द एक संदेश है। भौतिकता से भागो मत - इसे साधो। गृहस्थी, रोजगार, रिश्ते - ये सब भूलोक की साधना हैं। जो व्यक्ति पृथ्वी पर अपने कर्तव्य से भागता है, वह स्वर्ग में भी भटकेगा।\n\nयह धरती तुम्हें जड़ें देती है, ताकि तुम आकाश को छू सको।'
  },
  'भुवः': {
    sanskrit: 'भुवः (अंतरिक्ष लोक)',
    meaning: 'भुवः वह रहस्यमय स्थान है जो पृथ्वी और स्वर्ग के बीच फैला है। यह प्राणों का क्षेत्र है, भावनाओं का साम्राज्य है।\n\nप्राण का स्थान: मणिपुर और अनाहत चक्र के बीच\n\nतत्व: वायु (गतिशील, अदृश्य)\n\nगुण: परिवर्तन, संक्रमण, अस्थिरता',
    guidance: 'यह तुम्हारा सूक्ष्म शरीर है - मन, बुद्धि, चित्त, अहंकार। यहीं तुम्हारे संस्कार बसते हैं, तुम्हारी वासनाएं नाचती हैं, तुम्हारे कर्मों के बीज छिपे हैं।\n\nभुवः सबसे कठिन क्षेत्र है क्योंकि यहां न तो स्थूल का स्पष्ट आधार है, न सूक्ष्म की शुद्ध स्वतंत्रता। यहां साधक भटकता है - कभी ऊपर उठता है, कभी नीचे गिरता है।\n\nयहां की परीक्षा:\n\nजब तुम्हारे सामने विकल्प आए - सुख या सत्य, सुविधा या साधना, लोभ या त्याग - तब भुवः में तुम्हारी परीक्षा होती है। जो यहां डोल गया, वह भूः में गिर जाता है। जो यहां स्थिर रहा, वह स्वः की ओर बढ़ता है। जब यह शब्द तुम्हारे मार्ग में आए, पहचान लो: तुम्हारी भावनाएं अराजकता नहीं, बल्कि रूपांतरण का पवित्र स्थान हैं।\n\nक्रोध, प्रेम, भय, आनंद - ये सब ऊर्जा के रूप हैं। इन्हें दबाओ मत, इन्हें जानो। यह मध्य लोक सबसे कठिन है क्योंकि यहां न तुम पूरी तरह भौतिक हो, न पूरी तरह आध्यात्मिक।\n\nतुम पुल हो। और हर पुल को दोनों किनारों का दबाव सहना पड़ता है। लेकिन पुल के बिना कोई पार नहीं जाता। तुम्हारा यह संक्रमण काल, यह तनाव, यह द्वंद्व - सब साधना का हिस्सा है।'
  },
  'स्वः': {
    sanskrit: 'स्वः (स्वर्ग लोक)',
    meaning: 'स्वः वह दिव्य लोक नहीं जहां देवता विहार करते हैं। वह तुम्हारे भीतर का वह आकाश है जो असीम है, अखंड है, शाश्वत है।\n\nप्राण का स्थान: आज्ञा और सहस्रार चक्र\n\nतत्व: आकाश (सर्वव्यापी, निराकार)\n\nगुण: विस्तार, मुक्ति, परमानंद',
    guidance: 'स्वर्ग कोई मरने के बाद मिलने वाला स्थान नहीं - यह तुम्हारे भीतर अभी मौजूद चेतना की शुद्ध अवस्था है।\n\n जब तुम्हारी चेतना यहां पहुंचती है, तुम सिद्धियां प्राप्त करते हो - दूसरों के मन पढ़ सकते हो, अतीत-भविष्य देख सकते हो, शरीर छोड़कर विचर सकते हो।\n\nचेतावनी:\n\nपर ऋषि कहते हैं: "इन सिद्धियों में मत फंसो। ये सुनहरी जंजीरें हैं। स्वः भी पार करना है। तत् की ओर बढ़ो।"\n\nजब "स्वः" की झलक मिले, समझ लो: तुम अनंत को अपने भीतर धारण किए हो।\n\nहर वह क्षण जब तुम पूर्णतः वर्तमान में होते हो, हर वह पल जब तुम्हें सौंदर्य की अनुभूति होती है, हर वह झटका जब "मैं" खो जाता है और केवल "अस्तित्व" रह जाता है - वही स्वर्ग है।\n\nबच्चे की हंसी में, सूर्यास्त की लालिमा में, प्रेम में, ध्यान की गहराई में - स्वर्ग बार-बार झांक रहा है। तुम्हें कहीं जाना नहीं है। तुम्हें केवल जागना है जहां तुम पहले से हो।'
  },
  'तत्': {
    sanskrit: 'तत् (वह, परब्रह्म)',
    meaning: '"तत्" - वह। केवल "वह"। क्यों? क्योंकि उसे कोई नाम नहीं दे सकता। जो नाम दोगे, वह सीमित हो जाएगा। जो परिभाषा दोगे, वह छोटा हो जाएगा।\n\nमहावाक्य:\n\nउपनिषद कहते हैं: "तत् त्वम् असि" - वह तू है।\n\nयह सबसे बड़ा रहस्य है। तुम उसे खोज रहे हो जो तुम स्वयं हो। तुम उसकी पूजा कर रहे हो जो तुम्हारे भीतर बैठा है। यात्रा बाहर की नहीं, भीतर की है।',
    guidance: '"तत्" वह शून्य है जो पूर्ण है। वह अंधकार है जो प्रकाश से परे है। वह मौन है जिसमें सभी ध्वनियां समा जाती हैं।\n\nऋषि कहते हैं: तुम जब तक "मैं" और "तू" में बंटे हो, तब तक तुम तत् से दूर हो। जिस क्षण सब द्वंद्व मिट जाते हैं, उसी क्षण तत् प्रकट होता है।\n\nसाधना:\n\nतत् की साधना निषेध की साधना है:\n\n जब यह शब्द तुम्हारे जीवन में आए, याद करो: परम सत्य को शब्दों में बांधा नहीं जा सकता, केवल पहचाना जा सकता है।\n\nउपनिषद कहते हैं "तत् त्वम् असि" - वह तू ही है। तुम जिसे खोज रहे हो, वह खोजने वाला ही है। जैसे आंख खुद को नहीं देख सकती, वैसे ही चेतना अपने से परे नहीं जा सकती क्योंकि उससे परे कुछ है ही नहीं।\n\n"तत्" याद दिलाता है: चांद को देखो, उंगली को नहीं। सब शास्त्र, सब गुरु, सब शब्द केवल इशारे हैं। सत्य की अनुभूति तुम्हें स्वयं करनी होगी।'
  },
  'सवितुः': {
    sanskrit: 'सवितुः (सविता देव, सूर्य)',
    meaning: 'सविता केवल आकाश में चमकता सूर्य नहीं। वह वह दिव्य प्रेरक शक्ति है जो सृष्टि को प्रेरित करती है, जगाती है, चलायमान रखती है।\n\nसूर्य के तीन रूप:\n\nसविता (प्रेरक) - जो प्राणों को जगाता है\n\nसूर्य (प्रकाशक) - जो सब कुछ दिखाता है\n\nआदित्य (आदि पुरुष) - जो काल का स्वामी है',
    guidance: 'सूर्य बाहर भी है, भीतर भी। बाहर का सूर्य अंधकार को नष्ट करता है। भीतर का सूर्य अज्ञान को नष्ट करता है।\n\nजब योगी ध्यान में हृदय-कमल में प्रकाश देखता है, वह भीतरी सूर्य का साक्षात्कार है। वही सविता है जो कुंडलिनी को जगाता है, चक्रों को खोलता है, और अंततः सहस्रार में हजार सूर्यों का तेज बनकर प्रकट होता है।\n\nमंत्र का रहस्य:\n\n"सवितुः" कहकर हम किसी बाहरी देवता की प्रार्थना नहीं कर रहे। हम अपने भीतर की उस चेतन शक्ति को जगा रहे हैं जो सुप्त पड़ी है।\n\nऋषि का निर्देश:\n\nसूर्योदय के समय, जब पहली किरण आकाश को छूती है, उस क्षण गायत्री का जप करो। उस समय बाहर और भीतर के सूर्य एक हो जाते हैं। वह महायोग का क्षण है।'
  },
  'वरेण्यम्': {
    sanskrit: 'वरेण्यम् (सर्वश्रेष्ठ, चयन करने योग्य)',
    meaning: 'चुनने योग्य, सबसे उत्कृष्ट, पूजनीय। इसका गहरा अर्थ है - "जिसे वरण किया जाए", "जिसे चुना जाए"।\n\nस्वतंत्र इच्छा का सिद्धांत:\n\nब्रह्मांड ने तुम्हें स्वतंत्र इच्छा दी है। तुम क्या चुनते हो? अंधकार या प्रकाश? अज्ञान या ज्ञान? बंधन या मुक्ति?',
    guidance: 'यह शब्द याद दिलाता है: तुम दास नहीं, स्वामी हो। तुम्हारी नियति तुम्हारे हाथ में है। भगवान तुम्हें बचाने नहीं आएंगे - तुम्हें स्वयं चुनना होगा।\n\nऋषि का वचन:\n\n"हे मानव! हर श्वास के साथ, हर विचार के साथ, हर कर्म के साथ तुम चुन रहे हो। सचेत रहो। क्योंकि जो तुम आज चुन रहे हो, वही तुम कल बन जाओगे।"\n\nजीवन वरदान नहीं, वरण है। हर पल तुम्हें चुनना है।\n\nइस क्षण को ठुकराओ मत। यह क्षण ही वरेण्य है - चुनने योग्य, प्रेम करने योग्य, पूजने योग्य।'
  },
  'भर्गः': {
    sanskrit: 'भर्गः (दिव्य तेज, शुद्धिकरण)',
    meaning: '"भर्गः" वह अग्नि है जो पापों को जलाती है, संस्कारों को नष्ट करती है, कर्मों के बंधन तोड़ती है।\n\nतीन प्रकार की अग्नि:\n\nलौकिक अग्नि - जो लकड़ी जलाती है (भूः में)\n\nवैद्युत अग्नि - जो प्राणों में चलती है (भुवः में)\n\nदिव्य अग्नि - जो आत्मा को शुद्ध करती है (स्वः में)\n\nभर्गः यह तीसरी अग्नि है।',
    guidance: 'जब साधक घोर तपस्या करता है, जब उसका शरीर सूखता है, मन शांत होता है, तब भीतर एक अग्नि प्रज्वलित होती है। यह भर्गः है।\n\nयह अग्नि दो काम करती है:\n\nदाह - सब पापों को जला देती है\n\nप्रकाश - आत्मा के सत्य को प्रकट करती है\n\nऋषियों का अनुभव:\n\nजब हम तपस्या में बैठते थे, कभी-कभी ऐसा अनुभव होता था जैसे पूरा शरीर जल रहा है। पर यह पीड़ा नहीं थी, यह शुद्धिकरण था। हर संस्कार धुआं बनकर उड़ रहा था, हर वासना राख बन रही थी।\n\nमंत्र का प्रयोग:\n\nजब तुम "भर्गः" बोलते हो, कल्पना करो कि तुम्हारे हृदय में एक सुनहरी अग्नि जल रही है। वह तुम्हारी सारी गंदगी जला रही है - ईर्ष्या, क्रोध, लोभ, मोह - सब।\n\nअंधकार क्या है? वह प्रकाश है जिसे तुमने अभी पहचाना नहीं। जब "भर्गः" तुम्हारे मार्ग को रोशन करे, जान लो: तुम्हारी चेतना ही वह दीपक है जो छिपे हुए को प्रकट करती है।\n\nतुम्हारा अज्ञान, तुम्हारा भय, तुम्हारी भ्रांतियां - ये अंधकार नहीं, ये अनदेखे कोने हैं जहां तुमने अपनी जागरूकता का प्रकाश नहीं डाला। जैसे ही तुम किसी भय को गौर से देखते हो, वह घुलने लगता है।'
  },
  'देवस्य': {
    sanskrit: 'देवस्य (दिव्य, देवता का)',
    meaning: '"देवस्य" का अर्थ है - "देव का", "दिव्य का", "प्रकाशमय का"।\n\nदेव कौन है?\n\nसंस्कृत में "देव" शब्द "दिव्" धातु से बना है जिसका अर्थ है "चमकना", "प्रकाशित होना"।\n\nदेव वह है जो:\n\nद्योतते (प्रकाशित करता है)\n\nदीव्यति (खेलता है, लीला करता है)\n\nदेयात (देता है)',
    guidance: 'यहां "देव" का अर्थ कोई मूर्ति नहीं, कोई व्यक्ति नहीं। यह वह दिव्य चेतना है जो सब में व्याप्त है।\n\nऋषियों की दृष्टि:\n\nहम सब में देव बसा है। अंतर केवल इतना है - कुछ जाग गए हैं, कुछ अभी सो रहे हैं।\n\nजब तुम किसी मनुष्य में भी देव को देखने लगते हो, जब हर प्राणी में उसी एक चेतना को पहचानते हो, तब तुम "देवस्य" के सच्चे अर्थ को समझे हो।\n\nमंत्र में प्रयोग:\n\nव्यावहारिक साधना:\n\nहर प्राणी में देव को देखो। वृक्ष में, पत्थर में, पशु में, मनुष्य में - सब में। जब यह दृष्टि आ जाती है, तब संसार मंदिर बन जाता है।'
  },
  'धीमहि': {
    sanskrit: 'धीमहि (हम ध्यान करें, धारण करें)',
    meaning: '"धीमहि" का अर्थ है - "हम धारण करें", "हम ध्यान करें", "हम अपने अंदर बसाएं"।\n\nधी = बुद्धि + मनन\n\nयह केवल सोचना नहीं है। यह गहन चिंतन है, निरंतर स्मरण है।\n\nतीन स्तर:\n\nश्रवण - सुनना (गुरु से, शास्त्र से)\n\nमनन - मनन करना (विचार करना, समझना)\n\nनिदिध्यासन - ध्यान करना (अनुभव में उतारना)\n\n"धीमहि" यह तीसरा स्तर है।',
    guidance: 'ध्यान कोई तकनीक नहीं - यह जीने का तरीका है। जब "धीमहि" की पुकार आए, याद करो: तुम जहां ध्यान देते हो, वहीं तुम्हारी जीवन-ऊर्जा जाती है।\n\nअगर तुम पूरा दिन अपनी समस्याओं पर ध्यान दोगे, तुम समस्या बन जाओगे। अगर तुम सौंदर्य पर ध्यान दोगे, तुम्हारा जीवन सुंदर होगा। ध्यान माने - चुनाव। हर पल तुम चुन रहे हो कि तुम क्या बनोगे।\n\nधीमहि कहता है: सचेतन रहो। तुम्हारा मन भटकेगा - उसे वापस लाओ। हजार बार भटके, हजार बार लौटाओ। यही साधना है। और धीरे-धीरे, तुम्हारा ध्यान इतना स्थिर हो जाएगा कि तुम और तुम्हारा ध्येय एक हो जाएंगे।'
  },
  'धियो': {
    sanskrit: 'धियो (बुद्धि, ज्ञान, विवेक)',
    meaning: '"धियो" बहुवचन है "धी" का। अर्थ है - "हमारी बुद्धियां", "हमारे ज्ञान"।\n\nपर प्रश्न: बुद्धि तो व्यक्तिगत होती है, फिर बहुवचन क्यों?\n\nगहरा रहस्य:\n\nमनुष्य की एक बुद्धि नहीं, कई स्तर हैं:\n\nअन्नमय बुद्धि - जो शरीर से जुड़ी है (भोजन की चिंता)\n\nप्राणमय बुद्धि - जो प्राणों से जुड़ी है (भावनाओं की समझ)\n\nमनोमय बुद्धि - जो मन से जुड़ी है (विचारों की क्षमता)\n\nविज्ञानमय बुद्धि - जो ज्ञान से जुड़ी है (सत्य की पहचान)\n\nआनंदमय बुद्धि - जो आत्मा से जुड़ी है (परम ज्ञान)\n\nगायत्री इन सभी बुद्धियों को जगाने की प्रार्थना है।',
    guidance: 'तुम्हारी बुद्धि तुम्हारा शत्रु नहीं - यह तुम्हारा सबसे सूक्ष्म उपकरण है। जब "धियो" जागे, पहचानो: सही दिशा में लगी बुद्धि वह दूरबीन है जिससे अनंत स्वयं को देखता है।\n\nबुद्धि को दबाने से आध्यात्मिकता नहीं आती। बुद्धि को परिष्कृत करने से आती है। तुम्हारी बुद्धि अभी छोटी-छोटी चीजों में उलझी है - उसे बड़े प्रश्नों की ओर मोड़ो। "मैं कौन हूं?" "मृत्यु क्या है?" "प्रेम क्या है?" - ये प्रश्न बुद्धि को उसकी सीमा तक ले जाते हैं।\n\nऔर जब बुद्धि अपनी सीमा पर पहुंचती है, तब कुछ अद्भुत होता है - वह शांत हो जाती है। और उस शांति में, उससे परे जो है, वह प्रकट होता है। धियो - तुम्हारी बुद्धि सीढ़ी है। चढ़ो, और फिर सीढ़ी को भी पीछे छोड़ दो।\n\nसाधना:\n\nगायत्री का जप करते समय, माथे के बीच (आज्ञा चक्र) पर ध्यान केंद्रित करो। वहां एक दिव्य ज्योति की कल्पना करो। वही तुम्हारी तीसरी आंख है, वही प्रज्ञा का द्वार है।'
  },
  'यः': {
    sanskrit: 'यो (जो)',
    meaning: '"यो" एक छोटा सा शब्द, पर अत्यंत महत्वपूर्ण। यह सम्बन्ध-सूचक शब्द है - जोड़ने वाला।\n\nक्या जोड़ता है?\n\nदेव को भक्त से\n\nप्रकाश को अंधकार से\n\nज्ञान को अज्ञानी से\n\nपरम को जीव से',
    guidance: '"यो" याद दिलाता है कि सब कुछ जुड़ा है। कुछ भी अलग नहीं है।\n\nजो सूर्य आकाश में चमक रहा है, वही तुम्हारे हृदय में भी है। जो प्रकाश देव में है, वही तुम में भी है। बस पर्दा उठाना है।\n\nऋषियों का दर्शन:\n\nहम सब एक विराट पुरुष के अंग हैं। जैसे शरीर के सब अंग एक-दूसरे से जुड़े हैं, वैसे ही सब प्राणी एक-दूसरे से जुड़े हैं। "यो" इसी जुड़ाव का प्रतीक है।\n\nव्यावहारिक शिक्षा:\n\nजब तुम किसी को दुख देते हो, तुम अपने को ही दुख दे रहे हो। जब तुम किसी की सेवा करते हो, तुम अपनी ही सेवा कर रहे हो। क्योंकि सब एक हैं - "यो" के द्वारा जुड़े हैं।'
  },
  'नः': {
    sanskrit: 'नः (हमारा, हमारे)',
    meaning: '"नः" का अर्थ है "हमारा" - व्यक्तिगत नहीं, सामूहिक।\n\nक्यों "मेरा" नहीं, "हमारा"?\n\nयहां ऋषियों की महान दृष्टि प्रकट होती है: आध्यात्मिक यात्रा व्यक्तिगत भी है, सामूहिक भी।\n\nतीन स्तर:\n\nमैं - व्यक्तिगत अहंकार (सबसे निचला)\n\nहम - सामूहिक चेतना (मध्य)\n\nवह/तत् - सार्वभौमिक चेतना (सर्वोच्च)\n\nगायत्री "हम" से शुरू करती है क्योंकि "मैं" से सीधे "वह" तक नहीं पहुंचा जा सकता। पहले अहंकार को विस्तृत करना होता है।',
    guidance: 'तुम अकेले नहीं हो। जब "नः" प्रकट हो, याद आए: चेतना सामूहिक है। तुम्हारा जागरण सबका जागरण है।\n\nयह "मैं" और "हम" के बीच का पुल है। जब तुम केवल "मैं" में जीते हो, तुम सिकुड़ जाते हो। जब तुम "हम" में फैलते हो, तुम विस्तृत होते हो। लेकिन सावधान - "हम" का मतलब अपनी पहचान खोना नहीं है। यह अपनी पहचान को विस्तार देना है।\n\nनः कहता है: तुम्हारी मुक्ति निजी नहीं है - वह सार्वभौमिक है। जब तुम शांति पाते हो, तुम्हारे आसपास शांति की लहरें फैलती हैं। जब तुम प्रेम से भरते हो, सृष्टि प्रेममय होती है। तुम और संसार दो नहीं हैं। नः - हमारी यात्रा, हमारा जागरण, हमारा स्वर्ग।'
  },
  'प्रचोदयात्': {
    sanskrit: 'प्रचोदयात् (प्रेरित करे, प्रकाशित करे)',
    meaning: '"प्रचोदयात्" - यह मंत्र का चरम बिंदु है, पूर्णता है।\n\n"प्र + चोदयात्"\n\nप्र = आगे, ऊपर, परे\n\nचोदयात् = प्रेरित करे, धकेले, जगाए',
    guidance: 'यह समर्पण का शब्द है। जब "प्रचोदयात्" तुम्हें छू जाए, जान लो: तुम नियंत्रण में नहीं हो, और यही तुम्हारी मुक्ति है।\n\nतुम बांसुरी हो, सांस नहीं। तुम नदी हो, स्रोत नहीं। कितनी राहत है यह जानने में कि तुम्हें सब कुछ खुद करना नहीं है! समर्पण कमजोरी नहीं, परम शक्ति है।\n\nप्रचोदयात् - वह दिव्य बुद्धि तुम्हारी बुद्धि को दिशा दे। वह तुम्हारे भीतर से आवाज दे, और तुम सुनो। जब तुम अपनी छोटी-सी इच्छाशक्ति से थक जाओ, तब उस महाशक्ति को आमंत्रित करो जो पहले से ही तुम्हारे भीतर काम कर रही है।\n\nतुम बीज हो - फूल बनना तुम्हारा निर्णय नहीं, तुम्हारी नियति है। बस मिट्टी में समर्पित हो जाओ, बाकी सूर्य और पानी देख लेंगे। प्रचोदयात् - हे प्रभु, मुझे प्रेरित करो, मुझे प्रकाशित करो, मुझसे वह करवा जो मेरे करने का है।'
  }
}

// Create 14 slips
const createSlips = () => {
  return Array.from({ length: 14 }, (_, i) => ({
    id: i + 1
  }))
}

// Randomly assign words to slips on initialization
const initializeSlipWords = (slips) => {
  // Assign each slip a random starting word index
  return slips.map((slip) => ({
    ...slip,
    currentWordIndex: Math.floor(Math.random() * mantraWords.length)
  }))
}

const SlipSelection = ({ onSlipSelected }) => {
  const [isMixing, setIsMixing] = useState(false)
  const [slipPositions, setSlipPositions] = useState(() => {
    const initialSlips = createSlips()
    return initializeSlipWords(initialSlips)
  })
  const [unfoldedSlip, setUnfoldedSlip] = useState(null)
  const [showOpeningScreen, setShowOpeningScreen] = useState(false)
  const [openingSlipData, setOpeningSlipData] = useState(null)
  const [isMuted, setIsMuted] = useState(true)
  const containerRef = useRef(null)
  const lastShakeTime = useRef(0)
  const particlesContainerRef = useRef(null)

  useEffect(() => {
    // Device motion for shaking
    const handleMotion = (e) => {
      const acceleration = e.accelerationIncludingGravity || e.acceleration
      if (!acceleration) return

      const magnitude = Math.sqrt(
        acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
      )

      const now = Date.now()
      if (magnitude > 15 && now - lastShakeTime.current > 1000) {
        lastShakeTime.current = now
        mixSlips()
      }
    }

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion)
    }

    return () => {
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleMotion)
      }
    }
  }, [])

  const mixSlips = () => {
    setIsMixing(true)
    
    // Shuffle positions and randomize word assignments
    const shuffled = [...slipPositions].sort(() => Math.random() - 0.5)
    const withNewWords = shuffled.map(slip => ({
      ...slip,
      currentWordIndex: Math.floor(Math.random() * mantraWords.length)
    }))
    setSlipPositions(withNewWords)

    setTimeout(() => {
      setIsMixing(false)
    }, 2000)
  }

  // Get current word for a slip
  const getSlipWord = (slip) => {
    return mantraWords[slip.currentWordIndex]
  }

  // Get symbol for a slip (only 'ॐ' if word is 'ॐ', otherwise empty)
  const getSlipSymbol = (slip) => {
    const word = getSlipWord(slip)
    return word === 'ॐ' ? 'ॐ' : ''
  }

  // Rotate word for a slip
  const rotateSlipWord = (slipId) => {
    setSlipPositions(prev => prev.map(slip => {
      if (slip.id === slipId) {
        return {
          ...slip,
          currentWordIndex: (slip.currentWordIndex + 1) % mantraWords.length
        }
      }
      return slip
    }))
  }

  useEffect(() => {
    // Prevent body scroll when scroll is open or opening screen is showing
    if (unfoldedSlip || showOpeningScreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [unfoldedSlip, showOpeningScreen])

  // Create particles when opening screen is shown
  useEffect(() => {
    if (showOpeningScreen && particlesContainerRef.current) {
      particlesContainerRef.current.innerHTML = ''
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div')
        particle.className = 'unfold-particle'
        particle.style.left = (20 + Math.random() * 60) + '%'
        particle.style.top = (30 + Math.random() * 40) + '%'
        particle.style.animationDelay = (Math.random() * 1) + 's'
        particlesContainerRef.current.appendChild(particle)
      }
    }
  }, [showOpeningScreen])

  // Keep openingSlipData in sync with slipPositions
  useEffect(() => {
    if (openingSlipData) {
      const currentSlip = slipPositions.find(s => s.id === openingSlipData.id)
      if (currentSlip) {
        const word = getSlipWord(currentSlip)
        const details = wordDetails[word] || { sanskrit: word, meaning: word, guidance: '' }
        setOpeningSlipData({
          ...currentSlip,
          word: word,
          sanskrit: details.sanskrit,
          meaning: details.meaning,
          guidance: details.guidance,
          symbol: getSlipSymbol(currentSlip)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slipPositions])

  const handleSlipClick = (slip, e) => {
    e.stopPropagation()
    if (unfoldedSlip === slip.id) {
      // If already unfolded, rotate word (useEffect will sync openingSlipData)
      rotateSlipWord(slip.id)
    } else if (showOpeningScreen) {
      // If scroll is already open, switch to clicked slip or rotate if same
      if (openingSlipData && openingSlipData.id === slip.id) {
        // Same slip clicked - rotate word (useEffect will sync openingSlipData)
        rotateSlipWord(slip.id)
      } else {
        // Different slip clicked - switch to it
        const currentSlip = slipPositions.find(s => s.id === slip.id)
        if (currentSlip) {
          const word = getSlipWord(currentSlip)
          const details = wordDetails[word] || { sanskrit: word, meaning: word, guidance: '' }
          setOpeningSlipData({
            ...currentSlip,
            word: word,
            sanskrit: details.sanskrit,
            meaning: details.meaning,
            guidance: details.guidance,
            symbol: getSlipSymbol(currentSlip)
          })
        }
      }
    } else {
      // Show opening animation - stays open until user closes it
      const currentSlip = slipPositions.find(s => s.id === slip.id)
      if (currentSlip) {
        const word = getSlipWord(currentSlip)
        const details = wordDetails[word] || { sanskrit: word, meaning: word, guidance: '' }
        setOpeningSlipData({
          ...currentSlip,
          word: word,
          sanskrit: details.sanskrit,
          meaning: details.meaning,
          guidance: details.guidance,
          symbol: getSlipSymbol(currentSlip)
        })
        setShowOpeningScreen(true)
      }
    }
  }

  const handleCloseScroll = (e) => {
    e.stopPropagation()
    setShowOpeningScreen(false)
    setOpeningSlipData(null)
  }

  // Get audio element from AudioPlayer component
  const getAudioElement = () => {
    const audioElement = document.querySelector('audio')
    return audioElement
  }

  // Sync mute state with audio element
  useEffect(() => {
    if (!showOpeningScreen) return
    
    const audioElement = getAudioElement()
    if (audioElement) {
      setIsMuted(audioElement.muted)
      
      // Poll for changes in muted state (since muted property changes don't fire events)
      const interval = setInterval(() => {
        if (audioElement) {
          setIsMuted(audioElement.muted)
        }
      }, 100)
      
      return () => {
        clearInterval(interval)
      }
    }
  }, [showOpeningScreen])

  const toggleMute = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const audioElement = getAudioElement()
    if (audioElement) {
      const newMutedState = !audioElement.muted
      audioElement.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }

  const handleCloseFolder = (e) => {
    e.stopPropagation()
    setUnfoldedSlip(null)
  }

  const handleSwipe = (e) => {
    // Don't allow mixing when scroll is open or opening screen is showing
    if (unfoldedSlip || showOpeningScreen) return
    
    let startX = 0
    let startY = 0

    const handleStart = (evt) => {
      startX = evt.touches ? evt.touches[0].clientX : evt.clientX
      startY = evt.touches ? evt.touches[0].clientY : evt.clientY
    }

    const handleEnd = (evt) => {
      const endX = evt.changedTouches ? evt.changedTouches[0].clientX : evt.clientX
      const endY = evt.changedTouches ? evt.changedTouches[0].clientY : evt.clientY
      const diffX = Math.abs(endX - startX)
      const diffY = Math.abs(endY - startY)

      if (diffX > 50 || diffY > 50) {
        mixSlips()
      }
    }

    if (e.type === 'mousedown') {
      handleStart(e)
      document.addEventListener('mouseup', handleEnd, { once: true })
    } else if (e.type === 'touchstart') {
      handleStart(e)
      document.addEventListener('touchend', handleEnd, { once: true })
    }
  }

  return (
    <>
      {/* Opening Screen with Scroll Animation */}
      {showOpeningScreen && openingSlipData && (
        <div className={`opening-screen ${showOpeningScreen ? 'show' : ''}`} onClick={handleCloseScroll}>
          {/* Keep mantra circles visible in background */}
          <div className="mantra-circles-wrapper">
            <svg className="mantra-circles" viewBox="0 0 20000 20000" preserveAspectRatio="xMidYMid meet">
              <defs>
                <path id="circle1-opening" d="M 10000,8400 A 1600,1600 0 1,1 9999.9,8400" />
                <path id="circle2-opening" d="M 10000,-240 A 10240,10240 0 1,1 9999.9,-240" />
                <path id="circle3-opening" d="M 10000,-6000 A 16000,16000 0 1,1 9999.9,-6000" />
                <path id="circle4-opening" d="M 10000,-11760 A 21760,21760 0 1,1 9999.9,-11760" />
                <path id="circle5-opening" d="M 10000,-17520 A 27520,27520 0 1,1 9999.9,-17520" />
              </defs>
              <g className="circle-group-1">
                <text className="mantra-text-circle circle-1" fill="rgba(255,255,255,0.5)" fontSize="860" fontFamily="Noto Serif Devanagari">
                  <textPath href="#circle1-opening" startOffset="0%">
                    ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्
                  </textPath>
                </text>
              </g>
              <g className="circle-group-2">
                <text className="mantra-text-circle circle-2" fill="rgba(255,255,255,0.45)" fontSize="968" fontFamily="Noto Serif Devanagari">
                  <textPath href="#circle2-opening" startOffset="0%">
                    ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि
                  </textPath>
                </text>
              </g>
              <g className="circle-group-3">
                <text className="mantra-text-circle circle-3" fill="rgba(255,255,255,0.4)" fontSize="1076" fontFamily="Noto Serif Devanagari">
                  <textPath href="#circle3-opening" startOffset="0%">
                    ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः
                  </textPath>
                </text>
              </g>
              <g className="circle-group-4">
                <text className="mantra-text-circle circle-4" fill="rgba(255,255,255,0.35)" fontSize="1184" fontFamily="Noto Serif Devanagari">
                  <textPath href="#circle4-opening" startOffset="0%">
                    ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः
                  </textPath>
                </text>
              </g>
              <g className="circle-group-5">
                <text className="mantra-text-circle circle-5" fill="rgba(255,255,255,0.3)" fontSize="1292" fontFamily="Noto Serif Devanagari">
                  <textPath href="#circle5-opening" startOffset="0%">
                    ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः
                  </textPath>
                </text>
              </g>
            </svg>
          </div>
          <div className="scroll-container" onClick={(e) => e.stopPropagation()}>
            <div className="scroll-wrapper">
              <div className="scroll-ribbon"></div>
              <div className="scroll-rod-top"></div>
              <div className="scroll-top-roll"></div>
              <div className="scroll-paper">
                <div className="scroll-close-button" onClick={handleCloseScroll}>×</div>
                <button 
                  className="scroll-audio-toggle-button" 
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  {isMuted ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18.01 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.53C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z" fill="#8B4513"/>
                      <line x1="2" y1="2" x2="22" y2="22" stroke="#8B4513" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C17.01 19.86 20 16.28 20 12C20 7.72 17.01 4.14 14 3.23Z" fill="#8B4513"/>
                    </svg>
                  )}
                </button>
                <div className="scroll-content-animated">
                  {openingSlipData.symbol && <div className="scroll-symbol">{openingSlipData.symbol}</div>}
                  <div className="scroll-word-sanskrit">{openingSlipData.sanskrit}</div>
                  <div className="scroll-word-meaning-label">शाब्दिक अर्थ:</div>
                  <div className="scroll-word-meaning">{openingSlipData.meaning}</div>
                  <div className="scroll-word-guidance-label">ब्रह्मांडीय पथप्रदर्शक:</div>
                  <div className="scroll-word-guidance">{openingSlipData.guidance}</div>
                </div>
              </div>
              <div className="scroll-bottom-roll"></div>
              <div className="scroll-rod-bottom"></div>
            </div>
          </div>
          <div className="unfold-particles" ref={particlesContainerRef}></div>
        </div>
      )}

      <div 
        className="slip-selection"
        ref={containerRef}
        onMouseDown={handleSwipe}
        onTouchStart={handleSwipe}
        style={{ '--scroll-image': `url(${scrollImage})` }}
      >
      <div className="mantra-circles-wrapper">
        <svg className="mantra-circles" viewBox="0 0 20000 20000" preserveAspectRatio="xMidYMid meet">
          <defs>
            <path id="circle1" d="M 10000,8400 A 1600,1600 0 1,1 9999.9,8400" />
            <path id="circle2" d="M 10000,-240 A 10240,10240 0 1,1 9999.9,-240" />
            <path id="circle3" d="M 10000,-6000 A 16000,16000 0 1,1 9999.9,-6000" />
            <path id="circle4" d="M 10000,-11760 A 21760,21760 0 1,1 9999.9,-11760" />
            <path id="circle5" d="M 10000,-17520 A 27520,27520 0 1,1 9999.9,-17520" />
          </defs>
          <g className="circle-group-1">
            <text className="mantra-text-circle circle-1" fill="rgba(255,255,255,0.5)" fontSize="860" fontFamily="Noto Serif Devanagari">
              <textPath href="#circle1" startOffset="0%">
                ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्
              </textPath>
            </text>
          </g>
          <g className="circle-group-2">
            <text className="mantra-text-circle circle-2" fill="rgba(255,255,255,0.45)" fontSize="968" fontFamily="Noto Serif Devanagari">
              <textPath href="#circle2" startOffset="0%">
                ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि
              </textPath>
            </text>
          </g>
          <g className="circle-group-3">
            <text className="mantra-text-circle circle-3" fill="rgba(255,255,255,0.4)" fontSize="1076" fontFamily="Noto Serif Devanagari">
              <textPath href="#circle3" startOffset="0%">
                ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः
              </textPath>
            </text>
          </g>
          <g className="circle-group-4">
            <text className="mantra-text-circle circle-4" fill="rgba(255,255,255,0.35)" fontSize="1184" fontFamily="Noto Serif Devanagari">
              <textPath href="#circle4" startOffset="0%">
                ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः
              </textPath>
            </text>
          </g>
          <g className="circle-group-5">
            <text className="mantra-text-circle circle-5" fill="rgba(255,255,255,0.3)" fontSize="1292" fontFamily="Noto Serif Devanagari">
              <textPath href="#circle5" startOffset="0%">
                ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ भूर्भुवः स्वः
              </textPath>
            </text>
          </g>
        </svg>
      </div>

      <div className="slip-title">चुनें अपना 2026 मार्गदर्शक शब्द</div>

      <div className={`bowl-container ${isMixing ? 'mixing' : ''}`}>
        <div className="copper-plate"></div>
        <div className="slips-pyramid">
          {slipPositions.map((slip, index) => (
            <div
              key={slip.id}
              className={`slip scroll-slip ${unfoldedSlip === slip.id ? 'unfolded' : ''} ${unfoldedSlip && unfoldedSlip !== slip.id ? 'hidden' : ''}`}
              style={{
                '--rotation': `${-15 + (index % 3) * 15}deg`,
                '--delay': `${index * 0.5}s`,
              }}
              onClick={(e) => handleSlipClick(slip, e)}
            >
              {unfoldedSlip === slip.id ? (
                <div className="scroll-content">
                  <div className="scroll-close" onClick={handleCloseFolder}>×</div>
                  <div className="slip-sanskrit">{getSlipWord(slip)}</div>
                  {(() => {
                    const word = getSlipWord(slip)
                    const details = wordDetails[word] || { sanskrit: word, meaning: word, guidance: '' }
                    return (
                      <>
                        <div className="slip-meaning-label">शाब्दिक अर्थ:</div>
                        <div className="slip-meaning">{details.meaning}</div>
                        <div className="slip-guidance-label">ब्रह्मांडीय पथप्रदर्शक:</div>
                        <div className="slip-guidance">{details.guidance}</div>
                      </>
                    )
                  })()}
                  <button 
                    className="select-slip-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      const word = getSlipWord(slip)
                      const details = wordDetails[word] || { sanskrit: word, meaning: word, guidance: '' }
                      onSlipSelected({
                        ...slip,
                        sanskrit: details.sanskrit,
                        meaning: details.meaning,
                        guidance: details.guidance,
                        symbol: getSlipSymbol(slip)
                      })
                    }}
                  >
                    चुनें
                  </button>
                </div>
              ) : (
                <div className="scroll-rolled">
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default SlipSelection

