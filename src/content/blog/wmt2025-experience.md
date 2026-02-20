---
title: 'WMT2025 机器翻译比赛：我的参赛经历'
description: '参加 WMT2025 机器翻译比赛的经历分享，包括使用 LLM、CFT、SFT+DPO 等技术的实践心得。'
pubDate: 2025-01-20
tags: ['Machine Translation', 'LLM', 'AI Research', 'WMT']
---

## 背景

最近我参加了 WMT2025（Conference on Machine Translation 2025）机器翻译比赛，这是我第一次参与顶级的机器翻译赛事。这次经历让我对大模型在机器翻译任务中的应用有了更深入的理解。

## 技术方案

### 1. 模型选择

我们选择了基于 LLaMA 的架构作为基座模型，主要考虑：
- 强大的多语言理解能力
- 活跃的开源社区
- 丰富的微调方法支持

### 2. 训练策略

#### CFT (Continued Fine-Tuning)

首先进行持续预训练，让模型适应翻译任务：

```python
# 伪代码示例
model = LLaMAForCausalLM.from_pretrained("llama-2-7b")
tokenizer = LLaMATokenizer.from_pretrained("llama-2-7b")

# 翻译数据格式
translation_data = [
    {
        "source": "Hello, world!",
        "target": "你好，世界！",
        "lang_pair": "en-zh"
    }
]

# CFT 训练
trainer = CFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=translation_dataset,
    max_length=512,
    batch_size=8
)
trainer.train()
```

#### SFT (Supervised Fine-Tuning)

使用高质量的平行语料进行监督微调：

- 数据清洗：去除低质量翻译对
- 数据增强：回翻译、噪声注入
- 难样本挖掘：聚焦困难翻译样本

#### DPO (Direct Preference Optimization)

引入人类反馈，优化翻译质量：

```python
# DPO 训练示例
dpo_trainer = DPOTrainer(
    model=model,
    ref_model=reference_model,
    beta=0.1,
    train_preference_dataset=preference_data
)

# preference data 格式
# {
#     "prompt": "Translate to Chinese: Hello",
#     "chosen": "你好",
#     "rejected": "您好啊"
# }
```

### 3. 评估指标

我们使用了多个评估指标：
- **BLEU**：传统的机器翻译评估指标
- **COMET**：基于神经网络的评估指标
- **人工评估**：母语者的主观评分

## 实验结果

### 性能优化技巧

#### 1. VeRL 框架

使用 VeRL (Versatile Reinforcement Learning) 框架进行高效的强化学习训练：

- 自动化的 RL pipeline
- 支持多种 RL 算法
- 高效的显存管理

#### 2. FSPO 算法

FSPO (Forward-Supervised Policy Optimization) 解决了冷启动问题：

```python
# FSPO 训练流程
fspo_trainer = FSPOTrainer(
    model=model,
    forward_policy="supervised",
    rl_algorithm="ppo"
)
```

#### 3. 系统优化

- 混合精度训练（FP16 + FP32）
- 梯度累积
- 数据并行 + 模型并行

## IN2X 数据处理

比赛使用的是 IN2X 数据集，这是一个低资源语言对的翻译任务。我们主要做了以下工作：

### 数据预处理

```python
def clean_translation_pairs(data):
    # 1. 去重
    data = deduplicate(data)

    # 2. 语言检测
    data = filter_by_language(data)

    # 3. 长度过滤
    data = filter_by_length(data, min_len=5, max_len=500)

    # 4. 质量评分
    data = score_quality(data, threshold=0.7)

    return data
```

### 数据增强

对于低资源语言，数据增强至关重要：

1. **回翻译**（Back-translation）
2. **多语言预训练**
3. **跨语言迁移学习**

## EMNLP Workshop 论文

基于这次比赛的经历，我们撰写了一篇论文，被 EMNLP Workshop 接收。论文主要贡献包括：

1. 提出了改进的 SFT+DPO 训练流程
2. 解决了低资源机器翻译的冷启动问题
3. 在多个语言对上取得了 state-of-the-art 性能

## 心得体会

### 技术层面

1. **数据质量 > 数据数量**
   - 高质量的小数据集优于低质量的大数据集
   - 数据清洗和过滤至关重要

2. **对齐技术的重要性**
   - SFT 建立基础能力
   - DPO 进一步优化输出质量
   - RLHF 带来人类偏好对齐

3. **工程优化的必要性**
   - 训练效率直接影响实验迭代速度
   - 显存优化决定了能使用的模型规模

### 团队协作

参加这次比赛让我深刻体会到团队合作的重要性：
- 明确的分工：数据处理、模型训练、评估优化
- 高效的沟通：定期同步进展和问题
- 知识共享：每个人都能从中学到新东西

## 未来方向

基于这次经历，我对未来的研究方向有了更清晰的认识：

1. **多模态机器翻译**
   - 结合视觉信息的翻译任务
   - 图像-文本联合建模

2. **低资源机器翻译**
   - Few-shot 学习
   - 元学习（Meta-learning）

3. **高效训练方法**
   - 参数高效微调（PEFT）
   - 知识蒸馏

## 参考资料

- [WMT 官方网站](https://statmt.org/wmt25/)
- [VeRL GitHub](https://github.com/volcengine/verl)
- [DPO 论文](https://arxiv.org/abs/2305.18290)

---

如果你对机器翻译或大模型训练感兴趣，欢迎交流讨论！
