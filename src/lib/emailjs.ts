import emailjs from '@emailjs/browser';

// EmailJS 설정
// 1. https://www.emailjs.com/ 에서 계정 생성
// 2. Email Service 연결 (Gmail, Outlook 등)
// 3. Email Template 생성
// 4. 아래 값들을 실제 값으로 교체

export const EMAILJS_CONFIG = {
  // EmailJS에서 발급받은 Service ID
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_o3p8bqp',
  
  // EmailJS에서 생성한 Template ID
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_crxs40h',
  
  // EmailJS Public Key (User ID)
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'qcVcZkaUD9FyG6T0a',
  
  // 수신자 이메일 (선택사항, 템플릿에서 직접 설정 가능)
  TO_EMAIL: process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL || 'biny.global@gmail.com'
};

// 메일 전송 인터페이스
export interface EmailData {
  from_email: string;
  subject: string;
  message: string;
  from_name?: string;
  to_email?: string;
}

// 메일 전송 함수
export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    console.log('Sending regular email...');
    console.log('Email data:', {
      from_email: emailData.from_email,
      subject: emailData.subject,
      message_length: emailData.message.length
    });
    
    // EmailJS 서비스 초기화
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    
    // 템플릿 파라미터 준비 (이름 없이 이메일만 사용)
    const templateParams = {
      user_email: emailData.from_email,
      user_subject: emailData.subject,
      message: emailData.message,
      to_email: emailData.to_email || EMAILJS_CONFIG.TO_EMAIL,
      reply_to: emailData.from_email,
    };
    
    console.log('Template params:', templateParams);
    
    // 메일 전송
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );
    
    console.log('Email sent successfully:', response);
    return response.status === 200;
    
  } catch (error) {
    console.error('Email sending failed:', error);
    // 더 자세한 에러 정보 출력
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return false;
  }
};

// 파일 첨부가 있는 메일 전송 (무료 계정 호환)
export const sendEmailWithAttachment = async (
  emailData: EmailData, 
  file: File | null
): Promise<boolean> => {
  try {
    console.log('Starting email send process...');
    console.log('EmailJS Config:', {
      serviceId: EMAILJS_CONFIG.SERVICE_ID,
      templateId: EMAILJS_CONFIG.TEMPLATE_ID,
      publicKey: EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 5) + '...',
      toEmail: EMAILJS_CONFIG.TO_EMAIL
    });
    
    // 파일이 없으면 일반 메일 전송
    if (!file) {
      console.log('No file attachment, sending regular email...');
      return await sendEmail(emailData);
    }
    
    console.log('File attachment detected:', file.name, file.type, file.size);
    
    // 파일 크기 체크 (10MB 제한)
    if (file.size > 10 * 1024 * 1024) {
      console.error('File too large:', file.size);
      throw new Error('파일 크기가 10MB를 초과합니다.');
    }
    
    // 파일 정보를 메시지에 포함시켜 일반 메일로 전송 (무료 계정 호환)
    const fileInfo = `\n\n--- 첨부 파일 정보 ---\n파일명: ${file.name}\n파일 형식: ${file.type}\n파일 크기: ${(file.size / 1024).toFixed(2)} KB\n\n※ 첨부 파일은 별도로 회신 이메일을 통해 보내주시거나, 다른 방법을 통해 전달해주세요.`;
    
    const modifiedEmailData = {
      ...emailData,
      message: emailData.message + fileInfo
    };
    
    console.log('Sending email with file info in message...');
    return await sendEmail(modifiedEmailData);
    
  } catch (error) {
    console.error('Email with attachment sending failed:', error);
    // 더 자세한 에러 정보 출력
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // 파일 첨부 실패 시 파일 없이 메일 전송 시도
    console.log('Attempting to send email without attachment...');
    try {
      return await sendEmail(emailData);
    } catch (fallbackError) {
      console.error('Fallback email sending also failed:', fallbackError);
      return false;
    }
  }
};

// EmailJS 설정 확인 함수
export const isEmailJSConfigured = (): boolean => {
  console.log('Checking EmailJS configuration...');
  console.log('Current config:', {
    SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
    TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
    PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY,
    TO_EMAIL: EMAILJS_CONFIG.TO_EMAIL
  });
  
  const isConfigured = !!(
    EMAILJS_CONFIG.SERVICE_ID && EMAILJS_CONFIG.SERVICE_ID.length > 0 &&
    EMAILJS_CONFIG.TEMPLATE_ID && EMAILJS_CONFIG.TEMPLATE_ID.length > 0 &&
    EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY.length > 0
  );
  
  console.log('Configuration valid:', isConfigured);
  return isConfigured;
}; 