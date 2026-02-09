import React from 'react';
import '../mission/mission.css';

const FormBox = ({ onSubmit, children }) => (
  <form className="form-box" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>{children}</form>
);

const Flex = ({ direction, gap, children, className = "" }) => (
  <div className={`flex-container ${className}`} style={{ flexDirection: direction, gap: gap === "100" ? "4px" : "12px" }}>
    {children}
  </div>
);

const Text = ({ children, className = "" }) => <span className={`text-node ${className}`}>{children}</span>;

const InputField = ({ label, placeholder }) => (
  <div className="field-group">
    <label className="field-label">{label}</label>
    <input type="text" className="field-input" placeholder={placeholder} />
  </div>
);

const SelectField = ({ label, children }) => (
  <div className="field-group">
    <label className="field-label">{label}</label>
    <div className="select-wrapper">
      <select className="field-input field-select">{children}</select>
      <span className="select-arrow">▼</span>
    </div>
  </div>
);

const SelectItem = ({ children }) => <option>{children}</option>;

const TextareaField = ({ label, placeholder }) => (
  <div className="field-group">
    <label className="field-label">{label}</label>
    <textarea rows="4" className="field-input field-textarea" placeholder={placeholder} />
  </div>
);

const ButtonGroup = ({ align, children }) => <div className={`btn-group align-${align}`}>{children}</div>;

const Button = ({ variant, onPress, children }) => (
  <button className={`btn btn-${variant}`} onClick={onPress}>{children}</button>
);

// 메뉴(왼쪽 리스트) 관련 컴포넌트
const Menu = ({ children }) => <ul className="menu-list">{children}</ul>;
const MenuItem = ({ children }) => <li className="menu-item">{children}</li>;
const MenuLabel = ({ children }) => <h3 className="menu-label">{children}</h3>;
const MenuDescription = ({ children }) => <p className="menu-desc">{children}</p>;
const MenuSeparator = () => <li className="menu-separator" />;
const StarIcon = () => (
  <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
  </svg>
);

const mission = () => {
  return (
      <div className="page-background">
        <div className="main-layout">
          
          {/* --- 왼쪽 카드 --- */}
          <div className="section-card left-section">
            <div className="section-header">
              <Text className="category-label">Recommend</Text>
              <h2 className="section-title">추천 미션 목록</h2>
            </div>
            
            <Menu>
              <MenuSeparator />
              {['미션1', '미션2', '미션3'].map((item, i) => (
                <MenuItem key={i}>
                  <StarIcon />
                  <MenuLabel>{item}</MenuLabel>
                  <MenuDescription>미션 설명</MenuDescription>
                </MenuItem>
              ))}
              <MenuSeparator />
              {['커스텀 미션', '커스텀 미션'].map((item, i) => (
                <MenuItem key={`custom-${i}`}>
                  <StarIcon />
                  <MenuLabel>{item}</MenuLabel>
                  <MenuDescription>미션 설명</MenuDescription>
                </MenuItem>
              ))}
            </Menu>
          </div>

          {/* --- 오른쪽 카드 --- */}
          <div className="section-card right-section">
            <FormBox onSubmit={() => alert("미션이 등록되었습니다!")}>
              <Flex direction="column" gap="100">
                  <h2 className="section-title">개인 미션 등록하기</h2>
                  <Text className="form-category">Custom Mission</Text>
              </Flex>
              
              <InputField
                  label="미션 이름"
                  placeholder="예) 하루에 물 1L 마시기"
              />
              
              <SelectField
                  label="단계(기한) 설정"
              >
                  <SelectItem>레벨업 모드</SelectItem>
              </SelectField>
              
              <TextareaField
                  label="미션 설명"
                  placeholder="해당 미션 설명"
              />
              
              <ButtonGroup align="justify">
                  <Button variant="primary" onPress={() => {}}>
                      Save information
                  </Button>
              </ButtonGroup>
            </FormBox>
          </div>

        </div>
      </div>
  );
};


export default mission;
