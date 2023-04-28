import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// eslint-disable-next-line
export default ({children, onClick, tip, btnClassName, tipClassName, placement}) => (
    <Tooltip title={tip} className={tipClassName} placement={placement} onClick={onClick}>
        <IconButton className={btnClassName} >
            {children}
        </IconButton>
    </Tooltip>
)