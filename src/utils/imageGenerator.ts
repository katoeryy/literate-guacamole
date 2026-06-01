import html2canvas from 'html2canvas';
import { GameState } from '../types';

/**
 * 生成生涯图图片
 * 使用 html2canvas 将 DOM 元素转换为高质量图片
 * 支持 3x 缩放以保证清晰度
 * 
 * @param elementId - 要转换为图片的 DOM 元素 ID
 * @returns 返回图片的 dataURL
 */
export async function generateCareerImage(elementId: string): Promise<string> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  try {
    // 使用 html2canvas 渲染 DOM 元素
    const canvas = await html2canvas(element, {
      scale: 3, // 3x 缩放确保图片清晰度
      backgroundColor: '#667eea', // 渐变背景色
      useCORS: true, // 允许跨域图片
      allowTaint: true, // 允许污染画布
      logging: false, // 关闭日志
    });

    // 使用 Canvas API 进行后处理增强
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // 提高对比度让图片更清晰
      ctx.filter = 'contrast(1.1)';
      ctx.drawImage(canvas, 0, 0);
    }

    // 返回高质量 PNG 图片
    return canvas.toDataURL('image/png', 1.0);
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

/**
 * 下载图片
 * 创建临时下载链接并触发下载
 * 
 * @param dataUrl - 图片的 dataURL
 * @param filename - 下载文件名
 */
export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 分享图片到社交平台
 * 支持微信、微博等平台
 * 
 * @param dataUrl - 图片的 dataURL
 */
export async function shareImage(dataUrl: string) {
  try {
    // 将 dataURL 转换为 Blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], 'my-world-cup-journey.png', { type: 'image/png' });

    // 检查是否支持分享 API
    if (navigator.share && navigator.canShare) {
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: '我的世界杯之旅',
          text: '快来看看我的世界杯执教成绩！',
          files: [file],
        });
        return true;
      }
    }

    // 如果不支持分享 API，复制图片到剪贴板
    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      }),
    ]);
    return true;
  } catch (error) {
    console.error('Share failed:', error);
    return false;
  }
}

/**
 * 生成分享用的二维码数据
 * 将当前游戏结果编码为可分享的链接
 * 
 * @param gameState - 游戏状态数据
 * @returns 编码后的分享数据
 */
export function generateShareData(gameState: GameState): string {
  const shareData = {
    team: gameState.selectedTeam?.name,
    wins: gameState.matchResults.filter((m) => !m.isPrediction && m.isWin).length,
    decisions: gameState.decisions.length,
    coachStyle: gameState.coachStyle,
    predictionScore: gameState.predictionScore,
  };

  return btoa(JSON.stringify(shareData));
}

/**
 * 图片质量优化函数
 * 对 Canvas 进行锐化和色彩增强
 * 
 * @param canvas - 要优化的 Canvas 对象
 * @returns 优化后的 Canvas 对象
 */
export function optimizeImageQuality(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // 创建图像数据
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // 简单的锐化处理
  for (let i = 0; i < data.length; i += 4) {
    // 增加对比度
    const factor = 1.05;
    data[i] = Math.min(255, Math.max(0, ((data[i] - 128) * factor) + 128));
    data[i + 1] = Math.min(255, Math.max(0, ((data[i + 1] - 128) * factor) + 128));
    data[i + 2] = Math.min(255, Math.max(0, ((data[i + 2] - 128) * factor) + 128));
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
