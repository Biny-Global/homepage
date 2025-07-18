# EmailJS 설정 가이드

Contact Us 섹션에서 실제 메일 전송이 가능하도록 EmailJS를 설정하는 방법입니다.

## 1. EmailJS 계정 생성

1. [EmailJS 공식 사이트](https://www.emailjs.com/)에 접속
2. "Sign Up" 클릭하여 무료 계정 생성
3. 이메일 인증 완료

## 2. Email Service 연결

1. EmailJS 대시보드에 로그인
2. "Email Services" 탭 클릭
3. "Add New Service" 클릭
4. 사용할 이메일 서비스 선택:
   - **Gmail** (권장): 개인 Gmail 계정
   - **Outlook**: Microsoft 계정
   - **Yahoo**: Yahoo 메일
   - 기타 SMTP 서비스

### Gmail 설정 예시:
1. "Gmail" 선택
2. Service ID 입력 (예: `gmail_service`)
3. Gmail 계정으로 로그인 및 권한 승인
4. "Create Service" 클릭

## 3. Email Template 생성

1. "Email Templates" 탭 클릭
2. "Create New Template" 클릭
3. Template ID 입력 (예: `contact_form`)

### 템플릿 내용 예시:

**Subject (제목):**
```
{{user_subject}} - BINY 홈페이지 문의
```

**Content (내용):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
    BINY 홈페이지 문의가 접수되었습니다
  </h2>
  
  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: #495057; margin-top: 0;">문의자 정보</h3>
    <p><strong>이메일:</strong> {{user_email}}</p>
    <p><strong>제목:</strong> {{user_subject}}</p>
  </div>
  
  <div style="background: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: #495057; margin-top: 0;">메시지 내용</h3>
    <div style="line-height: 1.6; color: #333;">
      {{message}}
    </div>
  </div>
  
  <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <h4 style="color: #6c757d; margin-top: 0;">답장 안내</h4>
    <p style="margin: 5px 0;"><strong>답장 주소:</strong> {{reply_to}}</p>
    <p style="margin: 5px 0;"><strong>수신처:</strong> {{to_email}}</p>
    <p style="margin: 5px 0; color: #6c757d; font-size: 0.9em;">
      이 메일에 직접 답장하시면 문의자에게 바로 전달됩니다.
    </p>
  </div>
  
  <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
  
  <div style="text-align: center; color: #6c757d; font-size: 0.85em;">
    <p>이 메일은 BINY 홈페이지 Contact Us 섹션을 통해 자동 발송되었습니다.</p>
    <p>BINY - 혁신적인 클라우드 및 AI 솔루션</p>
  </div>
</div>
```

**To Email (수신자):**
```
biny.global@gmail.com
```

### 간단한 템플릿 버전 (권장):

**Subject:**
```
{{user_subject}} - BINY 문의
```

**Content:**
```html
<h3>BINY 홈페이지 문의</h3>

<p><strong>보낸 사람:</strong> {{user_email}}</p>
<p><strong>제목:</strong> {{user_subject}}</p>

<h4>메시지:</h4>
<div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
{{message}}
</div>

<hr>
<p><small>답장 주소: {{reply_to}}</small></p>
```

4. "Save" 클릭

## 4. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_o3p8bqp
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_crxs40h
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=qcVcZkaUD9FyG6T0a
NEXT_PUBLIC_EMAILJS_TO_EMAIL=biny.global@gmail.com
```

### 값 확인 방법:

1. **SERVICE_ID**: Email Services에서 생성한 Service ID
2. **TEMPLATE_ID**: Email Templates에서 생성한 Template ID  
3. **PUBLIC_KEY**: 
   - Account 탭 → "API Keys" 섹션
   - "Public Key" 복사
4. **TO_EMAIL**: 메일을 받을 이메일 주소

## 5. 테스트

1. 개발 서버 재시작: `npm run dev`
2. Contact Us 섹션에서 테스트 메일 전송
3. 설정한 수신 이메일로 메일이 도착하는지 확인

## 6. 문제 해결

### 메일이 전송되지 않는 경우:

1. **Console 에러 확인**: 브라우저 개발자 도구에서 에러 메시지 확인
2. **EmailJS 설정 재확인**: Service ID, Template ID, Public Key가 정확한지 확인
3. **템플릿 변수 확인**: 템플릿에서 사용하는 변수명이 코드와 일치하는지 확인
4. **스팸 폴더 확인**: 수신 메일이 스팸 폴더에 있을 수 있음

### 파일 첨부가 작동하지 않는 경우:

1. EmailJS Pro 플랜 필요 (파일 첨부는 유료 기능)
2. 무료 플랜에서는 파일 없이만 메일 전송 가능

## 7. 요금제 정보

- **무료**: 월 200개 메일까지
- **개인**: 월 $15 (월 1,000개 메일, 파일 첨부 지원)
- **팀**: 월 $35 (월 10,000개 메일, 고급 기능)

## 8. 보안 고려사항

- Public Key는 클라이언트에 노출되므로 안전
- Private Key는 절대 클라이언트 코드에 포함하지 말 것
- 스팸 방지를 위해 reCAPTCHA 추가 고려

## 참고 링크

- [EmailJS 공식 문서](https://www.emailjs.com/docs/)
- [EmailJS React 가이드](https://www.emailjs.com/docs/examples/reactjs/)
- [EmailJS 템플릿 변수](https://www.emailjs.com/docs/user-guide/template-variables/) 