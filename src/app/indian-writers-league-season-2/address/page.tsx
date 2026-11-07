import { Metadata } from 'next';
import AddressPortalClient from './AddressPortalClient';

export const metadata: Metadata = {
  title: 'Shipping Address Verification | Indian Writers League Season 2',
  description: 'Verify your registered 10-digit phone number and submit your shipping address for your IWL Season 2 Certificate & Honours Kit.',
};

export default function IWLAddressPage() {
  return <AddressPortalClient />;
}
