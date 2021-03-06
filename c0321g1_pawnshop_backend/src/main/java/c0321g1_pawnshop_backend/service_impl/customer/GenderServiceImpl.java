package c0321g1_pawnshop_backend.service_impl.customer;

import c0321g1_pawnshop_backend.entity.customer.Gender;
import c0321g1_pawnshop_backend.repository.customer.GenderRepository;
import c0321g1_pawnshop_backend.service.customer.GenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenderServiceImpl implements GenderService {
    @Autowired
    private GenderRepository genderRepository;

    @Override
    public List<Gender> getGenderList() {
        return genderRepository.findAll();
    }

    @Override
    public List<Gender> findAll() {
        return genderRepository.findAll();
    }
}
