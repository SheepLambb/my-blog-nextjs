import React from 'react';

export default function AIPage() {
  return (
    <div className="hero">
      <h1>AI 指挥中心</h1>
      <p>神经网络接口 - 初始化序列...</p>
      <div style={{ marginTop: '2rem', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border)', borderRadius: '12px' }}>
        <span style={{ color: 'var(--muted)' }}>系统离线 / 等待模块加载</span>
      </div>
    </div>
  );
}
