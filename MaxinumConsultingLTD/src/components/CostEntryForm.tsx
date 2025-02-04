import { Form, Input, DatePicker, Select, Button, message } from 'antd'
import axiosBase from '../config/axiosBase'

const { Option } = Select

interface Transaction {
	dateTime: string
	author: string
	sum: number
	category: string
	comment?: string
}

const CostEntryForm = () => {
	const [form] = Form.useForm()

	const categories = ['Food', 'Transport', 'Entertainment']

	const onFinish = async (values: any) => {
		const transaction: Transaction = {
			dateTime: values.dateTime.format('YYYY-MM-DD'),
			author: 'Test-User',
			sum: Number(values.sum),
			category: values.category,
			comment: values.comment || '',
		}

		try {
			await axiosBase.post('/transactions.json', transaction)
			message.success('Расход успешно добавлен!')
			form.resetFields()
		} catch (error) {
			console.error('Ошибка при добавлении расхода:', error)
			message.error('Ошибка при добавлении расхода')
		}
	}

	return (
		<Form
			form={form}
			layout='vertical'
			onFinish={onFinish}
			style={{
				maxWidth: 400,
				margin: '40px auto',
				padding: '20px',
				background: '#fff',
				borderRadius: '8px',
				boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
			}}
		>
			<Form.Item
				label='Дата'
				name='dateTime'
				rules={[{ required: true, message: 'Пожалуйста, выберите дату!' }]}
			>
				<DatePicker style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item
				label='Сумма'
				name='sum'
				rules={[{ required: true, message: 'Пожалуйста, введите сумму!' }]}
			>
				<Input type='number' placeholder='Введите сумму' />
			</Form.Item>

			<Form.Item
				label='Категория'
				name='category'
				rules={[{ required: true, message: 'Пожалуйста, выберите категорию!' }]}
			>
				<Select placeholder='Выберите категорию'>
					{categories.map(cat => (
						<Option key={cat} value={cat}>
							{cat}
						</Option>
					))}
				</Select>
			</Form.Item>

			<Form.Item label='Комментарий' name='comment'>
				<Input.TextArea placeholder='Опционально' rows={3} />
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit' block>
					Добавить расход
				</Button>
			</Form.Item>
		</Form>
	)
}

export default CostEntryForm