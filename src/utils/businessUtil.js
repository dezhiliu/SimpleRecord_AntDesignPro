/**
 * 公用业务方法
 */

import { EXPEND_TYPE, INCOME_TYPE, TRANSFER_TYPE, LOAN_TYPE } from '@/store/mutation-types'

const statusMap = {
  0: {
    status: 'success',
    text: '已启用'
  },
  1: {
    status: 'default',
    text: '已停用'
  }
}

export function statusFilter (id = 1) {
  return statusMap[id].text
}

export function statusTypeFilter (id = 1) {
  return statusMap[id].status
}

// 构建描述
export function buildDesc (recordType, sourceAccountName, targetAccountName, amount) {
  switch (recordType) {
    case LOAN_TYPE:
      if (targetAccountName && targetAccountName !== '') {
        return '借贷：向收款账户' + '【' + targetAccountName + '】借出' + Math.abs(amount).toFixed(2) + '元'
      } else {
        return '借贷：由借贷账户' + '【' + sourceAccountName + '】借入' + Math.abs(amount).toFixed(2) + '元'
      }
    case TRANSFER_TYPE:
      if (targetAccountName && targetAccountName !== '') {
        return '内部转账：转出至账户' + '【' + targetAccountName + '】' + Math.abs(amount).toFixed(2) + '元'
      } else {
        return '内部转账：由账户  ' + '【' + sourceAccountName + '】转入' + Math.abs(amount).toFixed(2) + '元'
      }
    default:
      return '无'
  }
}

// 是否为流转类型
export function isTransferType (recordType) {
  return recordType && (recordType === EXPEND_TYPE || recordType === INCOME_TYPE)
}

// 报销文本
export function recoverableText (recoverableStatus) {
  switch (recoverableStatus) {
    case 2:
      return '待报销'
    case 3:
      return '已报销'
    default:
      return '非报销'
  }
}

// 报销颜色
export function recoverableColor (recoverableStatus) {
  switch (recoverableStatus) {
    case 2:
      return 'orange'
    case 3:
      return 'green'
    default:
      return ''
  }
}
