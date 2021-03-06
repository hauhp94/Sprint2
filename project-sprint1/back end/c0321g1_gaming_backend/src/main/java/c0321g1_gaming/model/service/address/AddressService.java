package c0321g1_gaming.model.service.address;

import c0321g1_gaming.model.entity.address.Address;

import java.util.List;

public interface AddressService {
    List<Address> getAddressList();

    //creator: vinhdn
    void save(Address address);

    void saveAddress(Address address);

    Long fileByAddressId(Address address);
}
