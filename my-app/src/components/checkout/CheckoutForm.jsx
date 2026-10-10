import { SHIPPING_OPTIONS, PAYMENT_LABELS } from "../../services/orderService";
import { formatRupiah } from "../../utils/format";

const INPUT_CLASS =
  "w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black";

function Section({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, className = "", children }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );
}

function RadioOption({ name, value, checked, onChange, children }) {
  return (
    <label className="flex items-center p-3 border border-gray-200 rounded-sm cursor-pointer hover:bg-gray-50">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-black focus:ring-black"
        required
      />
      {children}
    </label>
  );
}

export default function CheckoutForm({ formData, onChange }) {
  const textInput = (name, type, placeholder) => (
    <input
      type={type}
      name={name}
      value={formData[name]}
      onChange={onChange}
      required
      className={INPUT_CLASS}
      placeholder={placeholder}
    />
  );

  return (
    <div className="flex-1 space-y-6">
      <Section title="1. Shipping Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full Name" className="md:col-span-2">
            {textInput("fullName", "text", "John Doe")}
          </Field>
          <Field label="Email Address">{textInput("email", "email", "your@email.com")}</Field>
          <Field label="Phone Number">{textInput("phone", "tel", "081234567890")}</Field>
          <Field label="Full Address" className="md:col-span-2">
            <textarea
              name="address"
              value={formData.address}
              onChange={onChange}
              required
              rows="3"
              className={INPUT_CLASS}
              placeholder="123 Main Street, City, Province, Zip Code"
            />
          </Field>
        </div>
      </Section>

      <Section title="2. Shipping Method">
        <div className="space-y-3">
          {Object.entries(SHIPPING_OPTIONS).map(([value, option]) => (
            <RadioOption
              key={value}
              name="shipping"
              value={value}
              checked={formData.shipping === value}
              onChange={onChange}
            >
              <div className="ml-3 flex flex-1 justify-between">
                <span className="font-medium text-gray-900">{option.title}</span>
                <span className="text-gray-500">{formatRupiah(option.cost)}</span>
              </div>
            </RadioOption>
          ))}
        </div>
      </Section>

      <Section title="3. Payment Method">
        <div className="space-y-3">
          {Object.entries(PAYMENT_LABELS).map(([value, label]) => (
            <RadioOption
              key={value}
              name="paymentMethod"
              value={value}
              checked={formData.paymentMethod === value}
              onChange={onChange}
            >
              <span className="ml-3 font-medium text-gray-900">{label}</span>
            </RadioOption>
          ))}
        </div>
      </Section>
    </div>
  );
}
