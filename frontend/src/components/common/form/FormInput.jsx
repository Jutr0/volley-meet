import {Input} from "../../ui/input";
import {Label} from "../../ui/label";

const FormInput = ({name, label, formik, type, vertical = false}) => {
    const hasError = Boolean(formik.touched[name] && formik.errors[name]);

    return (
        <div className={`flex mb-4 ${vertical ? "flex-col gap-2" : "items-center"}`}>
            <div className={`flex-none pr-2 ${vertical ? 'w-full' : 'w-1/5 self-start pt-[18px] '}`}>
                <Label htmlFor={name} className={`block ${vertical ? 'text-left' : 'text-right'}`}>{label}</Label>
            </div>
            <div className={`flex-1 ${vertical ? 'w-full' : 'w-4/5'}`}>
                <Input
                    id={name}
                    name={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={hasError ? "border-destructive" : ""}
                    aria-invalid={hasError}
                    type={type}
                />
                {hasError && (
                    <p className="text-sm text-destructive mt-1">{formik.errors[name]}</p>
                )}
            </div>
        </div>
    );
};

export default FormInput;